module.exports = (message) => {

    const messageTypes = require('../messageTypes');
    console.log(users)

    switch(message.type){
        case messageTypes.USER_JOINED:
            users[message.userId] = {
                username: message.data.username,
                role: 'unassigned',
                color: '#fff',
                status: 'alive',
                position: [0,0]
            }
            
            sendMessage(clients, JSON.stringify(users[message.userId]))
            break;
        
        case messageTypes.USER_LEFT:
            delete users[message.userID]
            break
    
        case messageTypes.USER_MOVED:
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
}
