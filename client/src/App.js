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

            this.setState(
                {...data},
                client.send(JSON.stringify({...data, type: 'userJoined'}))
            )
        }
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
            const dataFromServer = JSON.parse(message.data)
            const stateToChange = {}

            if (dataFromServer.type === "userJoined" && dataFromServer.users){
							stateToChange.users = dataFromServer.users
							stateToChange.currentUser = dataFromServer.currentUser
							this.props.handleUserJoined(stateToChange)
							this.setState({ ...stateToChange })
            } else if (dataFromServer.type && dataFromServer.data){
							stateToChange.users = dataFromServer.data
							
							this.props.handleUsersChanged(stateToChange)
							this.setState({ ...stateToChange })            
						} else if (dataFromServer.type && dataFromServer.users){
							stateToChange.users = dataFromServer.users
							this.props.handleUsersChanged(stateToChange)
							this.setState({ ...stateToChange })
						} else if(message.type === "contentchange") {
							stateToChange.text = dataFromServer.data.editorContent || contentDefaultMessage
						} 
         }
		}
		
		componentWillUnmount() {
			client.send(JSON.stringify({type: 'userLeft'}))
		}

		render() {
			const {currentUser, isNight, docTurn, detTurn, mafiaTurn} = this.props
			const isMafia = currentUser.role === 'mafia'
			const isDoctor = currentUser.role === 'doctor'
			const isDetective = currentUser.role === 'detective'
			const shouldBeVisible = 
			!isNight 
			|| (mafiaTurn && isMafia) 
			|| (docTurn && isDoctor)
			|| (detTurn && isDetective)
			return (
				<>
					<Header />
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
		isNight: state.isNight,
		mafiaTurn: state.mafiaTurn,
		detTurn: state.detTurn,
		docTurn: state.docTurn
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(App)

