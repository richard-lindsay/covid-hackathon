module.exports = (users) => {
    // Take the users object and assign roles to all of them randomly. 
    // Number of mafia members is decided by the number of total players.

    const userArray = Object.entries(users)

    let numberOfMafia = Math.floor(userArray.length / 4)
    console.log(`Number of mafia members has been set to ${numberOfMafia}`)

    // Set mafia members     
    do {
        const chosenPlayer = getRandomInt(userArray.length)
        if (userArray[chosenPlayer][1].role !== 'mafia'){
            userArray[chosenPlayer][1].role  = 'mafia'
            numberOfMafia--
        }
    } while (numberOfMafia > 0)

    // Set one doctor 
    let numberofDoctors = 1
    do {
        const chosenPlayer = getRandomInt(userArray.length)
        if (userArray[chosenPlayer][1].role !== 'mafia'){
            userArray[chosenPlayer][1].role  = 'doctor'
            numberofDoctors--
        }
    } while (numberofDoctors > 0)

    // Set one detective 
    let numberofDetectives = 1
    do {
        const chosenPlayer = getRandomInt(userArray.length)
        if (userArray[chosenPlayer][1].role !== 'mafia' && userArray[chosenPlayer][1].role !== 'doctor'){
            userArray[chosenPlayer][1].role  = 'detective'
            numberofDetectives--
        }
    } while (numberofDetectives > 0)

    userArray.map(entry => {
        if(entry[1].role === 'unassigned'){
            entry[1].role = 'villager'
        }
    })

    return Object.fromEntries(userArray)
}

const getRandomInt = (max) =>  {
    console.log("GetRandomInt max", max)
    return Math.floor(Math.random() * Math.floor(max));
  }