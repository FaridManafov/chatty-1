import React, {Component} from 'react';

export default function NavBar(props) {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">chatty</a>
          <span>
            Users Online: {props.totalUsers}
          </span>
      </nav>
    )
  }
