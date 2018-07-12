import React, {Component} from 'react';
import Message from './Message.jsx';

export default function MessageList(props) {

  const messages = props.messages.map((msg) => {

    if (msg.type === 'chat') {
      return (
        <Message
          key={msg.id}
          type={msg.type}
          username={msg.username}
          content={msg.content}
          userColor={msg.userColor}/>
        )
    } else if (msg.type === 'notification') {
      return (
        <Message
          key={msg.id}
          type={msg.type}
          content={msg.content} />
      )
    }
  })

  return (
    <main className="messages">
      {messages}
    </main>
  )

}
