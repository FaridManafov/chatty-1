import React, {Component} from 'react';

/* If the message is a chat message, grab user color, name, and content. If it's the most recent message, assign it a CSS class to perform a brief animation */

export default function Message(props) {
  if (props.type === 'chat') {
    let userStyle = {
      color: props.userColor
    }

    const messageClassname = props.isMostRecentMessage ? 'message most-recent-message' : 'message'

    return (
      <div className={messageClassname}>
        <span style={userStyle} className="message-username">{props.username}</span>
        <span className="message-content">{props.content}</span>
      </div>
    )

  } else if (props.type === 'notification') {

    return (
      <div className="notification">
        <span className="notification-content">
          {props.content}
        </span>
      </div>
    )
  }
}
