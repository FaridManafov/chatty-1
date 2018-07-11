import React, {Component} from 'react';

export default function NavBar(props) {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">chatty.io</a>
          <span>{props.totalUsers}</span>
      </nav>
    )
  }
