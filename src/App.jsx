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

  handleInput = (e) => {
    if (e.key === 'Enter') {
      const incomingMessage = {
        id: Math.floor(Math.random() * 10000),
        username: this.state.currentUser.name,
        content: e.target.value
      };

      let updatedMessages = this.state.messages.slice();
      messages.push(incomingMessage);

      this.setState({
        messages: messages
      })
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages} />
        <ChatBar
          handleInput={this.handleInput}
          currentUser={this.state.currentUser.name} />
      </div>
    );
  }

}
