import React, { Component } from 'react'
import { w3cwebsocket as W3CWebSocket} from 'websocket'
import { connect } from 'react-redux';
import Login from './Login/Login'
import Header from './Header/Header'
import Game from './Game/Game'
import Rules from './Rules/Rules.js'
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';
import './App.css';
import { Modal } from './Modal/Modal';

// const client  = new W3CWebSocket('ws://127.0.0.1:8080')
const client  = new W3CWebSocket('wss://gentle-ridge-18754.herokuapp.com/')

const contentDefaultMessage = "Start writing your document here"

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
						username: null,
						message: '',
						showModal: false
				}
				
				this.logInUser = this.logInUser.bind(this)

		}
		
    logInUser = (username) => {
				this.setState({username: username})
        if (username.trim()) {
          const data = { username }
				  client.send(JSON.stringify({...data, type: 'userJoined'}))
        }
		}
		
		triggerNightTime= () => {
			client.send(JSON.stringify({
				type: 'nightAll'
		}))
		}

    onEditorStateChange = (text) => {
        client.send(JSON.stringify({
            type: 'contentchange',
            username: this.state.username,
            content: text
        }))
		}

		triggerShowDetectiveModal= (result) => {
			if (this.props.currentUser.role !== 'detective') return
			const message = `They are ${!result ? 'not ' : ''}a member of the Mafia.`
			this.setState({message: message, showModal: true})
		}

		showMurderModal = (type, victim = '') => {
			let message
			switch (type) {
				case 'villagerKilled' :
					message = `😱 A villager just died! They went by the name of ${victim.username}, may they Rest in Peace.`
					break;
				case 'mafiaKilled':
					message = `You chose to kill ${victim.username}. Well done, they were a member of the Mafia! ⚔️ `
					break;
				case 'noneKilled':
					message = 'Amen! No one died last night.'
					break;
				default:
					message = 'Not really sure what happened here... '
			}
			this.setState({message: message, showModal: true})
			
			setTimeout(()=> this.setState({message: null, showModal: false}), 4000)

		}

    componentWillMount() {
        client.onopen = () => {
            console.log("WebSocket Client Connected")
        }

        client.onmessage = (message) => {
					
            const dataFromServer = JSON.parse(message.data)
						const stateToChange = {}
						
						if (dataFromServer.type && dataFromServer.users && dataFromServer.type !== 'noneKilled'){
							stateToChange.users = dataFromServer.users
							stateToChange.currentUser = dataFromServer.currentUser
							stateToChange.gameState = dataFromServer.gameState
							this.props.handleUserJoined(stateToChange)
							this.setState({ ...stateToChange })
						} else if (dataFromServer.type === 'detectiveCheck') {
								this.triggerShowDetectiveModal(dataFromServer.result)
						} else if (dataFromServer.type.toLowerCase().includes('killed')) {							
							this.showMurderModal(dataFromServer.type, dataFromServer.victim || '')
						}
						else if(message.type === "contentchange") {
							stateToChange.text = dataFromServer.data.editorContent || contentDefaultMessage
						} 
         }
		}

		render() {
			const {currentUser, gameState} = this.props
			const shouldBeVisible = currentUser && currentUser.username && (!gameState.includes('G_S_N') ||
			gameState.toLowerCase().includes(currentUser.role.substring(0,3)))
			return (
				<>
					<Header triggerNightTime={this.triggerNightTime} />
					<div className="container-fluid">
						{currentUser && currentUser.username 
						? <Game shouldBeVisible={shouldBeVisible} client={client} /> 
						: <Login logInUser={this.logInUser} />}
					</div>
					<Rules />
					<Modal show={this.state.showModal} message={this.state.message} />
					</>
			);
		}
	}

const mapDispatchToProps  = dispatch => {
	return {
		handleUserJoined: (payload) => dispatch({ type: 'JOINED', payload }),
		handleUsersChanged: (payload) => dispatch({ type: 'USERS_CHANGED', payload })

	}
}

const mapStateToProps = state => {
	return {
		currentUser: state.currentUser,
		gameState: state.gameState
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(App)

