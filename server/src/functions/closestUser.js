module.exports = (userId, users) => {
    const data = users[userId]
    const position = data.position

    const otherUsers = Object.entries(users)
        .filter(it => it[0] !== userId)
        .filter(it => it[1].status === "alive")

    if (otherUsers.length === 0){
        return ""
    }

    const userDistances = {}
    otherUsers.forEach(user => {
        const distance = calculateDistance(position, user[1].position)
        userDistances[user[0]] = distance
    })
    const closestUser = Object.entries(userDistances).reduce((a, b) => { 
        return a[1] < b[1] ? a : b
    })

    if (closestUser[1] > 60){
        return ""
    }
    return closestUser[0]
}


const calculateDistance = (pos1, pos2) => (
    Math.abs(pos1[0] - pos2[0]) + Math.abs(pos1[1] - pos2[1])
)