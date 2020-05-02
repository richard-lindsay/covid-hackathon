import React, { Component } from 'react'
import { w3cwebsocket as W3CWebSocket} from 'websocket'
import { connect } from 'react-redux';
import Login from './Login/Login'
import Header from './Header/Header'
import Game from './Game/Game'

import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';
import './App.css';

const client  = new W3CWebSocket('ws://127.0.0.1:8080')
const contentDefaultMessage = "Start writing your document here"

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            userActivity: [],
						username: null,
						role: null,
            text: '',
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

    componentWillMount() {
        client.onopen = () => {
            console.log("WebSocket Client Connected")
        }

        client.onmessage = (message) => {
					console.log(message.data);
					
            const dataFromServer = JSON.parse(message.data)
            const stateToChange = {}

            if (dataFromServer.type && dataFromServer.users){
							stateToChange.users = dataFromServer.users
							stateToChange.currentUser = dataFromServer.currentUser
							stateToChange.gameState = dataFromServer.gameState
							this.props.handleUserJoined(stateToChange)
							this.setState({ ...stateToChange })
						} else if(message.type === "contentchange") {
							stateToChange.text = dataFromServer.data.editorContent || contentDefaultMessage
						} 
         }
		}

		render() {
			const {currentUser, gameState} = this.props
			const shouldBeVisible = currentUser.username && (!gameState.includes('G_S_N') ||
			gameState.toLowerCase().includes(currentUser.role.substring(0,3)))
			return (
				<>
					<Header triggerNightTime={this.triggerNightTime} />
					<div className="container-fluid">
						{currentUser.username 
						? <Game shouldBeVisible={shouldBeVisible} client={client} /> 
						: <Login logInUser={this.logInUser} />}
					</div>
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

