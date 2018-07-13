import React, {Component} from 'react';

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
