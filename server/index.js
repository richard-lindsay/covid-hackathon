const webSocketServer = require('websocket').server
const http = require('http')

// Helper functions to clean up main 
const getUniqueId = require('./src/functions/getUniqueId')
const sendMessage = require('./src/functions/sendMessage')
const handleMessage = require('./src/functions/handleMessage')
const removeRole = require('./src/functions/removeRole')
const assignRoles = require('./src/functions/assignRoles')

// Constants for message types 
const messageTypes = require('./src/messageTypes')
const gameStates = require('./src/gameStates')



// Store a list of clients and connections
const clients = {}

// Store a list of users and their details
const users = {}

// Start with pregame state 
let gameState = gameStates.G_S_PREGAME

// Unneeded variables 
let editorContent = null
let userActivity = []



// Web socket libraries and setup
const webSocketServerPort = 8080
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

            const json = { type: message.type }

            console.log(message)

            switch(message.type){
                case messageTypes.USER_JOINED:
                    // add new user to list and return list of users 
                    // {"type":"userJoined", "username":"test"}
                    users[userId] = {
                        username: message.username,
                        role: 'unassigned',
                        color: '#fff',
                        status: 'alive',
                        position: [0,0]
                    }
                    
                    // Send message to clients 
                    sendUpdate(messageTypes.USER_JOINED)

                    break;
                
                case messageTypes.USER_LEFT:
                    // remove user from list and return clean list of users 
                    delete users[message.userID]
                    var response = {
                        type: messageTypes.USER_LEFT,
                        users: removeRole(users)
                    }
                    sendUpdate(messageTypes.USER_LEFT)
                    break
            
                case messageTypes.USER_MOVED:
                    // update users position before returning all users back 
                    // {"type":"userMoved", "position":[10,10]}
                    users[userId].position = message.position
                    sendUpdate(messageTypes.USER_LEFT)
                    break
                
                case messageTypes.USER_KILLED:
                    // Set killed users state to dead. If number of mafia === 0 end game 
                    // This needs to be changed to use userId instead of username for obs reasons
                    // {"type": "userKilled", "username": "test"}

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

                case messageTypes.USER_DETECTED:
                    // Show the role of one user. Need to decide if it is shown to everyone or just one person


                    break
                case messageTypes.USER_SAVED:
                    // Force this user to be saved, no matter what happens 
                    break
        
                case messageTypes.NIGHT_ALL:
                    // Set the screen to black for all users
                    
                    break
                
                case messageTypes.NIGHT_MAFIA:
                    // Set the screen to black for all users except mafia and allow then to choose one person
                    
                    break
                
                case messageTypes.NIGHT_DOC:
                    // Set the screen to black for all users except doctor and allow then to choose one person

                    break
        
                case messageTypes.NIGHT_DET:
                    // Set the screen to black for all users except detective and allow then to choose one person

                    break
        
                default: 
                    console.log('Unknown message type received!')
            }




            // handleMessage(dataFromClient)
            // console.log(users)
            // if (dataFromClient.type === typesDef.USER_EVENT){
            //     users[userID] = dataFromClient
            //     userActivity.push(`${dataFromClient.username} joined to edit the document`)
            //     json.data = { users, userActivity }
            // } else if (dataFromClient.type === typesDef.CONTENT_CHANGE){
            //     editorContent = dataFromClient.content
            //     json.data = { editorContent, userActivity }
            // }

        }
    })

    connection.on('close', (connection) => {
        console.log((new Date()) + ' Peer ' + userId + " disconnected.")

        const json = { type : typesDef.USER_EVENT }
        userActivity.push(`${users[userId].username} left the document`)

        json.data = { users, userActivity }

        delete clients[userId]
        delete users[userId]

        sendMessage(clients, JSON.stringify)
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