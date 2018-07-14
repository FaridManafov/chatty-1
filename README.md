# chatty

A real-time chat app built with React and WebSockets.

## Features

- Name changes
- Colors assigned to each user
- Active user count
- Conditional class highlighting on new messages

## Screenshots

[]

## Dependencies

`npm` and `nodejs` are required to run this app.

### Client

- react
- babel
- webpack
- eslint
- node-sass
- sockjs

### WebSocket Server

- express
- ws
- uuid


## Getting Started

- In the root directory, run `npm install` to install client-side dependencies.
- In the `chat_server` directory, run `npm install` again to install WebSocket dependencies. Run `node server.js` to start the WS server.
- Back in the parent directory, run `npm start` and head to localhost:3000 in your browser.

## To Do

- Sidebar displaying names of active users
- Allow users to embed images/video
- Fluid UI/UX & transitions
