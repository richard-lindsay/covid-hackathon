const initialState = {
	users: [],
	currentUser: {
		username: '',
		position: [0,0]
	},
	gameState: 'G_S_PREGAME'
}

export default (state = initialState, action) => {
	switch (action.type) {
		case "JOINED": 
			return {
				...state,
				users: action.payload.users,
				currentUser: action.payload.currentUser,
				gameState: action.payload.gameState
			}
		case "USERS_CHANGED": 
			return {
				...state,
				users: action.payload.users,

			}
		default:
			return {
				...state
			}
			
	}
}
