import React, { Component } from 'react'
import { w3cwebsocket as W3CWebSocket} from 'websocket'

import Login from './Login/Login'
import Header from './Header/Header'
import Game from './Game/Game'
import { Navbar, NavbarBrand, UncontrolledTooltip } from 'reactstrap'

import Editor from 'react-medium-editor';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';
import './App.css';

const client  = new W3CWebSocket('ws://127.0.0.1:8080')
const contentDefaultMessage = "Start writing your document here"

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
						currentUsers: [
							{
								username: 'Rich',
								position: [0,0]
							},
							{
								username:'Joe',
								position: [0,0]
							},
							{
								username: 'Rachel',
								position: [20,20]
							}
						],
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
console.log(dataFromServer);

            if (dataFromServer.type === "userJoined" && dataFromServer.data){
                stateToChange.currentUsers = dataFromServer.data
            } else if(message.type === "contentchange") {
                stateToChange.text = dataFromServer.data.editorContent || contentDefaultMessage
            } 


            this.setState({ ...stateToChange })
        }
    }

		render() {
			const {
				username, role, currentUsers
			} = this.state;
			return (
				<React.Fragment>
					<Header userName={username} role={role} />
					<div className="container-fluid">
						{username 
						? <Game username={username} currentUsers={currentUsers} client={client} /> 
						: <Login logInUser={this.logInUser} />}
					</div>
				</React.Fragment>
			);
		}
	}


export default App;

