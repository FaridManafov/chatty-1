import React, {Component} from 'react';
import NavBar from './NavBar.jsx'
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'

export default class App extends Component {
  state = {
    currentUser: {
      name: 'Anonymous'
    },

    usersOnline: 0,

    messages: [
      {
        id: 1,
        content: "Welcome to the chat server! Be nice.",
        username: "Server"
      }
    ]
  }

  componentDidMount() {
    /* Handle websocket connection */
    this.socket = new WebSocket("ws://0.0.0.0:3001");

    this.socket.onopen = (e) => {
      console.log('==> connected')
    }

    this.socket.onmessage = (e) => {
      let parsed = JSON.parse(e.data);

      /* Display name changes and chat messages separately */
      if (parsed.type === 'nameChange') {
        const newMessage = {
          id: parsed.messageId,
          username: '***',
          oldUserName: parsed.oldUserName,
          newUserName: parsed.newUserName,
          type: 'notification'
        };

        newMessage.content = `${newMessage.oldUserName} changed their name to ${newMessage.newUserName}`;

        const updatedMessages = this.state.messages.slice();
        updatedMessages.push(newMessage);

        this.setState({
          messages: updatedMessages
        });

      } else if (parsed.type === 'chat') {
          const newMessage = {
            id: parsed.messageId,
            content: parsed.content,
            username: parsed.username,
            type: 'chat'
          };
          const updatedMessages = this.state.messages.slice();
          updatedMessages.push(newMessage);

          this.setState({
            messages: updatedMessages
          });
        }

        else if (parsed.type === 'users') {
          this.setState({
            usersOnline: parsed.data
          })
        }
      }
    }

  handleInput = (e) => {
    /* Send value of user chat input to socket */
    if (e.key === 'Enter' && e.target.value.length > 0) {
      const incomingMessage = {
        type: 'chat',
        username: this.state.currentUser.name,
        content: e.target.value
      };
      this.socket.send(JSON.stringify(incomingMessage))
      e.target.value = '';
    }
  }

  handleNameChange = (username) => {
      const nameChangeMsg = {
        type: 'nameChange',
        oldUserName: this.state.currentUser.name,
        newUserName: username
      };
      /* Set state */
      this.state.currentUser.name = username;
      /*Send the message*/
      this.socket.send(JSON.stringify(nameChangeMsg))
  }

  render() {
    return (
      <div>
        <NavBar totalUsers={this.state.usersOnline}/>
        <MessageList messages={this.state.messages} />
        <ChatBar
          handleInput={this.handleInput}
          handleNameChange={this.handleNameChange}
          currentUser={this.state.currentUser.name} />
      </div>
    )
  }
}
