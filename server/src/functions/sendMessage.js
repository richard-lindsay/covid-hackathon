module.exports = (clients, json) => {
    Object.keys(clients).map((client) => {
        clients[client].sendUTF(json)
    })
}