const initialState = {
	users: [],
	currentUser: {
		username: '',
		position: [0,0]
	},
	isNight: false,
	mafiaTurn: false,
	detTurn: false,
	docTurn: false
}

export default (state = initialState, action) => {
	switch (action.type) {
		case "JOINED": 
			return {
				...state,
				users: action.payload.users,
				currentUser: action.payload.currentUser
			}
		case "USERS_CHANGED": 
			return {
				...state,
				users: action.payload.users,
			}
		case "G_S_N_MAFIA": 
			return {
				...state,
				users: action.payload.users,
			}
		case "NIGHT_ALL": 
			return {
				...state,
				isNight: true
			}
		case "NIGHT_MAFIA":
			return {
				...state,
				mafiaTurn: true,
				detTurn: false,
				docTurn: false
			}
		case "NIGHT_DOC":
			return {
				...state,
				mafiaTurn: false,
				detTurn: false,
				docTurn: true
			}
		case "NIGHT_DET": 
			return {
				...state,
				mafiaTurn: false,
				detTurn: true,
				docTurn: true
			} 
		default:
			return {
				...state
			}
			
	}
}
