module.exports = (users) => {
    return Object.values(users).map(({role, ...other}) => (other))
}