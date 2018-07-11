import React, {Component} from 'react';

export default function ChatBar(props) {
  let nextTextField;

  const handleNameChange = (e) => {
    if (e.key === 'Enter' && e.target.value.length > 0) {
      props.handleNameChange(e.target.value)
      nextTextField.focus();
    }
  }

  const clearField = (e) => {
    e.target.value = '';
  }

  return (
    <footer className="chatbar">
      <input
        className="chatbar-username"
        defaultValue={props.currentUser}
        onClick={clearField}
        placeholder='Username'
        onKeyDown={handleNameChange} />
      <input className="chatbar-message"
        placeholder="Type a message and hit enter"
        onKeyDown={props.handleInput}
        ref={(node) => nextTextField = node}/>
    </footer>
  )
}
