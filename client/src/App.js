import React, { Component } from 'react'
import { w3cwebsocket as W3CWebSocket} from 'websocket'

import Identicon from 'react-identicons';

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
            currentUsers: [],
            userActivity: [],
            username: null,
            text: '',
            players: []
        }
    }

    logInUser = () => {
        const username = this.username.value

        if (username.trim()) {
            const data = { username }

            this.setState(
                {...data},
                client.send(JSON.stringify({...data, type: 'userevent'}))
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

            if (dataFromServer.type === "userevent"){
                stateToChange.currentUsers = Object.values(dataFromServer.data.users)
            } else if(dataFromServer.type === "contentchange") {
                stateToChange.text = dataFromServer.data.editorContent || contentDefaultMessage
            }

            stateToChange.userActivity = dataFromServer.data.userActivity
            this.setState({ ...stateToChange })
        }
    }

    componentDidMount() {
      const canvas = this.refs.canvas
      const ctx = canvas.getContext("2d")
  
      ctx.fillRect(20, 20, 10, 10)
      
    }

    showLoginSection = () => (
        <div className="account">
        <div className="account__wrapper">
          <div className="account__card">
            <div className="account__profile">
              <Identicon className="account__avatar" size={64} string="randomness" />
              <p className="account__name">Hello, user!</p>
              <p className="account__sub">Join to edit the document</p>
            </div>
            <input name="username" ref={(input) => { this.username = input; }} className="form-control" />
            <button type="button" onClick={() => this.logInUser()} className="btn btn-primary account__btn">Join</button>
          </div>
        </div>
      </div>
    )

    showEditorSection = () => (
        <div className="main-content">
          <canvas ref="canvas" width={500} height={500} />
        </div>
      )

      render() {
        const {
          username
        } = this.state;
        return (
          <React.Fragment>
            <Navbar color="light" light>
              <NavbarBrand href="/">Real-time document editor</NavbarBrand>
            </Navbar>
            <div className="container-fluid">
              {username ? this.showEditorSection() : this.showLoginSection()}
              {/* { this.showEditorSection() } */}
            </div>
          </React.Fragment>
        );
      }
    }


export default App;

