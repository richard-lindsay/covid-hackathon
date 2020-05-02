module.exports = (userId, users) => {

    const testUsers = {
        "1": {
            username: "test",
            role: 'unassigned',
            color: '#fff',
            status: 'alive',
            position: [0,0],
            closestUser: ""
        },
        "2": {
            username: "test",
            role: 'unassigned',
            color: '#fff',
            status: 'alive',
            position: [50,50],
            closestUser: ""

        },
        "3": {
            username: "test",
            role: 'unassigned',
            color: '#fff',
            status: 'alive',
            position: [20,20],
            closestUser: ""
        }
    }    
    
    console.log("Iterate through other users and return closest based off manhatten distance ")

    const id = "1"
    const data = testUsers[id]
    const position = data.position

    const otherUsers = Object.entries(testUsers).filter(it => it[0] !== id)

    const userDistances = {}
    otherUsers.forEach(user => {
        const distance = calculateDistance(position, user[1].position)
        userDistances[user[0]] = distance
    })
    const closestUser = Object.entries(userDistances).reduce((a, b) => { 
        return a[1] < b[1] ? a : b
    })
    return closestUser[0]
}


const calculateDistance = (pos1, pos2) => (
    Math.abs(pos1[0] - pos2[0]) + Math.abs(pos1[1] - pos2[1])
)