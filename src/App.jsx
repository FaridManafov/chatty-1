import React, {Component} from 'react';
import NavBar from './NavBar.jsx'
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'

export default class App extends Component {
  state = {
    currentUser: {
      name: 'Bob'
    },
    messages: [
      {
        id: 111,
        type: "incomingMessage",
        content: "I won't be impressed with technology until I can download food.",
        username: "Anonymous1"
      },
      {
        id: 222,
        type: "incomingMessage",
        content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
        username: "Anonymous2"
      },
      {
        id: 333,
        type: "incomingMessage",
        content: "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
        username: "Anonymous2"
      },
      {
        id: 444,
        type: "incomingMessage",
        content: "This isn't funny. You're not funny",
        username: "nomnom"
      }
    ]
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://0.0.0.0:3001");

    this.socket.onopen = (e) => {
      console.log('==> websocket connection open')
    }

    this.socket.onmessage = (e) => {
      console.log(e)
    }

  }

  handleInput = (e) => {
    let inputField = e.target.value;
    if (e.key === 'Enter' && inputField.length > 0) {
      const incomingMessage = {
        username: this.state.currentUser.name,
        content: inputField
      };

      console.log(incomingMessage)
      this.socket.send(JSON.stringify(incomingMessage));
      inputField = '';
    }
  }

  handleNameChange = (e) => {
    let nameField = e.target.value;
    if (e.key === 'Enter' && nameField.length > 0) {
      this.state.currentUser.name = nameField;
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages} />
        <ChatBar
          handleInput={this.handleInput}
          handleNameChange={this.handleNameChange}
          currentUser={this.state.currentUser.name} />
      </div>
    );
  }

}
