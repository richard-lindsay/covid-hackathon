const webSocketServer = require('websocket').server
const http = require('http')

const webSocketServerPort = 8080

const httpServer = http.createServer()
httpServer.listen(webSocketServerPort)
const wsServer = new webSocketServer({httpServer})


const getUniqueId = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4();
}

const clients = {}
const users = {}
let editorContent = null
let userActivity = []

const sendMessage = (json) => {
    Object.keys(clients).map((client) => {
        clients[client].sendUTF(json)
    })
}

const typesDef = {
    USER_EVENT: "userevent",
    CONTENT_CHANGE: "contentchange"
}

console.log("Ready to start server")

wsServer.on('request', (request) => {
    var userID = getUniqueId()

    console.log((new Date()) + ' Received a new connection from origin ' + request.origin + '.')

    const connection = request.accept(null, request.origin)
    clients[userID] = connection

    console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients))

    connection.on('message', (message) => {
        if (message.type === 'utf8') {
            const dataFromClient = JSON.parse(message.utf8Data)
            const json = { type: dataFromClient.type }

            if (dataFromClient.type === typesDef.USER_EVENT){
                users[userID] = dataFromClient
                userActivity.push(`${dataFromClient.username} joined to edit the document`)
                json.data = { users, userActivity }
            } else if (dataFromClient.type === typesDef.CONTENT_CHANGE){
                editorContent = dataFromClient.content
                json.data = { editorContent, userActivity }
            }
            sendMessage(JSON.stringify(json))
        }
    })

    connection.on('close', (connection) => {
        console.log((new Date()) + ' Peer ' + userID + " disconnected.")

        const json = { type : typesDef.USER_EVENT }
        userActivity.push(`${users[userID].username} left the document`)

        json.data = { users, userActivity }

        delete clients[userID]
        delete users[userID]

        sendMessage(JSON.stringify)
    })
})