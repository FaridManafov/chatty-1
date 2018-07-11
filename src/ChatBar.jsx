import React, {Component} from 'react';

export default function ChatBar(props) {
  return (
    <footer className="chatbar">
      <input
        className="chatbar-username"
        defaultValue={props.currentUser}
        onKeyDown={props.handleNameChange} />
      <input className="chatbar-message"
        placeholder="Type a message and hit enter"
        onKeyDown={props.handleInput} />
    </footer>
  )
}
