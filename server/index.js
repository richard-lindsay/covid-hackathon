const webSocketServer = require('websocket').server
const http = require('http')


// Store a list of clients and connections
const clients = {}

// Store a list of users and their details
const users = {}

// Unneeded variables 
let editorContent = null
let userActivity = []

// Helper functions to clean up main 
const getUniqueId = require('./src/functions/getUniqueId')
const sendMessage = require('./src/functions/sendMessage')
const handleMessage = require('./src/functions/handleMessage')
const removeRole = require('./src/functions/removeRole')

// Constants for message types 
const messageTypes = require('./src/messageTypes');

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
                    
                    // var response = { 
                    //     type: messageTypes.USER_JOINED,
                    //     users: removeRole(users),
                    //     currentUser: users[userId]
                    // }
                    console.log(response)

                    // Send message to clients 
                    Object.keys(clients).map((client) => {
                        var response = { 
                            type: messageTypes.USER_JOINED,
                            users: removeRole(users),
                            currentUser: users[userId]
                        }
                        clients[client].sendUTF(JSON.stringify(response))
                    })

                    // sendMessage(clients, JSON.stringify(response))
                    break;
                
                case messageTypes.USER_LEFT:
                    // remove user from list and return clean list of users 
                    delete users[message.userID]
                    var response = {
                        type: messageTypes.USER_LEFT,
                        users: removeRole(users)
                    }
                    sendMessage(clients, JSON.stringify(response))
                    break
            
                case messageTypes.USER_MOVED:
                    // update users position before returning all users back 
                    // {"type":"userMoved", "position":[10,10]}
                    users[userId].position = message.position
                    var response = {
                        type: messageTypes.USER_MOVED,
                        data: removeRole(users)
                    }
                    sendMessage(clients, JSON.stringify(response))
                    break
                
                case messageTypes.USER_KILLED:
                    break
        
                case messageTypes.USER_DETECTED:
                    break
                case messageTypes.USER_SAVED:
                    break
        
                case messageTypes.NIGHT_ALL:
                    break
                
                case messageTypes.NIGHT_MAFIA:
                    break
                
                case messageTypes.NIGHT_DOC:
                    break
        
                case messageTypes.NIGHT_DET:
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



            sendMessage(clients, JSON.stringify(json))
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