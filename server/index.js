const webSocketServer = require('websocket').server
const http = require('http')

// Helper functions to clean up main 
const getUniqueId = require('./src/functions/getUniqueId')
const getRandomColor = require('./src/functions/generateRandomColor')
const sendMessage = require('./src/functions/sendMessage')
const handleMessage = require('./src/functions/handleMessage')
const removeRole = require('./src/functions/removeRole')
const assignRoles = require('./src/functions/assignRoles')
const closestUser = require('./src/functions/closestUser')

// Constants for message types 
const messageTypes = require('./src/messageTypes')
const gameStates = require('./src/gameStates')


// Store a list of clients and connections
const clients = {}

// Store a list of users and their details
const users = {}

let round = {}

// Start with pregame state 
let gameState = gameStates.G_S_PREGAME

// Unneeded variables 
let editorContent = null
let userActivity = []


// Web socket libraries and setup

let webSocketServerPort = process.env.PORT;
if (webSocketServerPort == null || webSocketServerPort == "") {
    webSocketServerPort = 8080;
}
const httpServer = http.createServer()
httpServer.listen(webSocketServerPort)
const wsServer = new webSocketServer({httpServer})

// Unneeded object 
const typesDef = {
    USER_EVENT: "userevent",
    CONTENT_CHANGE: "contentchange"
}

console.log("Ready to start server")

// Open connection
wsServer.on('request', (request) => {
    var userId = getUniqueId()

    console.log((new Date()) + ' Received a new connection from origin ' + request.origin + '.')

    // Add new connection to list of clients
    const connection = request.accept(null, request.origin)
    clients[userId] = connection

    console.log('connected: ' + userId + ' in ' + Object.getOwnPropertyNames(clients))

    connection.on('message', (messageString) => {
        if (messageString.type === 'utf8') {

            // Parse messages 
            const message = JSON.parse(messageString.utf8Data)

            switch(message.type){
                case messageTypes.USER_JOINED:
                    // add new user to list and return list of users 
                    // {"type":"userJoined", "username":"test"}
                    users[userId] = {
                        userId,
                        username: message.username,
                        role: 'unassigned',
                        color: getRandomColor(),
                        status: 'alive',
                        position: [0,0],
                        closestUser: ""
                    }
                    
                    // Send message to clients 
                    sendUpdate(messageTypes.USER_JOINED)
                    break;
            
                case messageTypes.USER_MOVED:
                    // update users position before returning all users back 
                    // {"type":"userMoved", "position":[10,10]}
                    users[userId].position = message.position
                    users[userId].closestUser = closestUser(userId, users)
                    sendUpdate(messageTypes.USER_MOVED)
                    break
        
                case messageTypes.GAME_START:
                    // Set the game state from G_S_PREGAME to G_S_START and give out roles
                    // {"type": "gameStart"}

                    if(gameState === gameStates.G_S_PREGAME){
                        
                        Object.entries(assignRoles(users)).map(entry => {
                            users[entry[0]] = entry[1]
                        })

                        gameState = gameStates.G_S_START
                        sendUpdate(messageTypes.GAME_START)

                    } else {
                        console.log("GAME_START message received in incorrect game state")
                    }
                    break

                case messageTypes.NIGHT_ALL:
                    gameState = gameStates.G_S_NIGHT
                    round = {}
                    sendUpdate(messageTypes.NIGHT_ALL)
                
                    // await new Promise(resolve => setTimeout(resolve, 10000));

                    gameState = gameStates.G_S_N_MAFIA_CHOOSE
                    sendUpdate(messageTypes.NIGHT_MAFIA)
                    break
                
                case messageTypes.MAFIA_KILL:
                    // {"type": "mafiaKill", "toKill": "1234"}
                    if (gameState === gameStates.G_S_N_MAFIA_CHOOSE){
                        round["kill"] = message.toKill

                        gameState = gameStates.G_S_N_MAFIA_RETURN
                        console.log(gameState)
                        sendUpdate(messageTypes.MAFIA_KILL)

                        var millisecondsToWait = 5000;
                        setTimeout(function() {
                            // Whatever you want to do after the wait
                            gameState = gameStates.G_S_N_DOC_CHOOSE
                            sendUpdate(messageTypes.MAFIA_KILL)
                        }, millisecondsToWait);

                    } else {
                        console.log("Message receieved at wrong game state", message.type)
                    }
                    break

                case messageTypes.DOCTOR_SAVE:
                    // {"type": "doctorSave", "toSave": "1234"}
                    if(gameState === gameStates.G_S_N_DOC_CHOOSE){
                        round["save"] = message.toSave

                        gameState = gameStates.G_S_N_DOC_RETURN
                        sendUpdate(messageTypes.DOCTOR_SAVE)
                        var millisecondsToWait = 5000;
                        setTimeout(function() {
                            gameState = gameStates.G_S_N_DET_CHOOSE
                            sendUpdate(messageTypes.DOCTOR_SAVE)
                        }, millisecondsToWait);

                    } else {
                        console.log("Message received at wrong game state", message.type)
                    }
                    break

                case messageTypes.DETECTIVE_CHECK:
                    // {"type": "detectiveCheck", "toCheck": "1234"}
                    if(gameState === gameStates.G_S_N_DET_CHOOSE){
                        round["check"] = message.toCheck

                        gameState = gameStates.G_S_N_DET_RETURN
                        sendUpdate(messageTypes.DETECTIVE_CHECK)

                        setTimeout(function() {
                            // kill off player if not saved 
                            detectPlayer()

                            setTimeout(function() {
                                killPlayer()
                                                            
                                gameState = gameStates.G_S_DAY
                                if (checkEndState()){
                                    sendUpdate(messageTypes.GAME_OVER)
                                } else {
                                    sendUpdate(messageTypes.DETECTIVE_CHECK)
                                }
                            }, 3000)
                        }, 5000);

                    } else {
                        console.log("Message received at wrong game state", message.type)
                    }
                    break

                case messageTypes.VILLAGER_LYNCH:
                    // {"type" = "villagerLynch", "toLynch": "1234"}

                    if(gameState === gameStates.G_S_DAY){
                        lynchPlayer(message.toLynch)
                        if (checkEndState()){
                            sendUpdate(messageTypes.GAME_OVER)
                        } else {
                            gameState = gameStates.G_S_START
                            sendUpdate(messageTypes.GAME_START)
                        }
                    } else {
                        console.log("Message received at wrong game state", message.type)
                    }
                    break
                default: 
                    console.log('Unknown message type received!', message.type)
            }
        }
    })

    connection.on('close', (connection) => {
        console.log((new Date()) + ' Peer ' + userId + " disconnected.")

        delete clients[userId]
        delete users[userId]

        sendUpdate(messageTypes.USER_LEFT)

    })
})


const sendUpdate = (messageType) => {
    Object.keys(clients).map((client) => {
        var response = {
            type: messageType,
            users: removeRole(users),
            currentUser: users[client],
            gameState: gameState
        }
        clients[client].sendUTF(JSON.stringify(response))
    })
}

const lynchPlayer = (userId) => {
    users[userId].status = "dead"

    messageType = messageTypes.VILLAGER_KILLED
    if (users[userId].role === "mafia") {
        messageType = messageTypes.MAFIA_KILLED
    } 
    Object.keys(clients).map((client) => {
        var response = {
            type: messageType,
            victim: users[userId]
        }
        clients[client].sendUTF(JSON.stringify(response))
    })
}

const killPlayer = () => {
    // ToDo: send message if mafia 
    var kill = round["kill"]
    var save = round["save"]
 
    let messageType = messageTypes.VILLAGER_KILLED
    if (kill !== save){
        users[kill].status = "dead"
   
        if (users[kill].role === "mafia") {
            mesageType = messageTypes.MAFIA_KILLED
        }

        Object.keys(clients).map((client) => {
            var response = {
                type: messageType,
                victim: users[kill]
            }
            clients[client].sendUTF(JSON.stringify(response))
        })
    } else {
        sendUpdate(messageTypes.NONE_KILLED)
    }

}

const detectPlayer = () => {
    var check = round["check"]

    var result = false
    if (users[check].role === "mafia"){
        result = true
    }
    
    var detective = Object.entries(users).filter(x => x[1].role === "detective")[0][0]
    var response = {
        type: messageTypes.DETECTIVE_CHECK,
        result
    }
    clients[detective].sendUTF(JSON.stringify(response))
}


const checkEndState = () => {

    var livingUsers = Object.entries(users).filter(x => x[1].status === "alive")

    var mafia = livingUsers.filter(x => x[1].role === "mafia")
    var villagers = livingUsers.filter(x => x[1].role !== "mafia")

    if (mafia.length === 0) {
        gameState = gameStates.G_S_VILLAGERS_WIN
        return true
    } else if (mafia.length >= villagers.length){
        gameState = gameStates.G_S_MAFIA_WIN
        return true
    }
    return false
}