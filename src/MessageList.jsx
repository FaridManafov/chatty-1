import React, {Component} from 'react';
import Message from './Message.jsx';

export default function MessageList(props) {

  const messages = props.messages.map((msg) => {
    return (
      <Message
        key={msg.id}
        username={msg.username}
        content={msg.content} />
    )
  })

  return (
    <main className="messages">
      {messages}
    </main>
  )

}
