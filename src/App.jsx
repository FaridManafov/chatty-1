import React, {Component} from 'react';
import NavBar from './NavBar.jsx'
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'

export default class App extends Component {
  state = {
    currentUser: {
      name: 'Anonymous'
    },
    messages: [
      {
        id: 1,
        content: "Welcome to the chat server! Be nice.",
        username: "jonathan"
      }
    ]
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://0.0.0.0:3001");

    this.socket.onopen = (e) => {
      console.log('==> websocket connection open')
    }
    this.socket.onmessage = (e) => {
      let parsed = JSON.parse(e.data);
      const newMessage = {
        id: parsed.messageId,
        content: parsed.content,
        username: parsed.username
      }

      let updatedMessages = this.state.messages.slice();
      updatedMessages.push(newMessage);

      this.setState({
        messages: updatedMessages
      });
    }

  }

  handleInput = (e) => {
    let inputField = e.target.value;
    if (e.key === 'Enter' && inputField.length > 0) {
      const incomingMessage = {
        username: this.state.currentUser.name,
        content: inputField
      };
      inputField = '';
      this.socket.send(JSON.stringify(incomingMessage));
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
