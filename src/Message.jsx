import React, {Component} from 'react';

export default function Message(props) {
  if (props.type === 'chat') {
    return (
      <div className="message">
        <span className="message-username">{props.username}</span>
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
