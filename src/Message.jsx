import React, {Component} from 'react';

export default function Message(props) {
  if (props.type === 'chat') {

    let userStyle = {
      color: props.userColor
    }

    return (
      <div className="message">
        <span style={userStyle} className="message-username">{props.username}</span>
        <span className="message-content">{props.content}</span>
      </div>
    )
  } else if (props.type === 'notification') {
    return (
      <div className="notification">
        <span className="notification-content">
          <i>* {props.content}</i>
        </span>
      </div>
    )
  }
}
