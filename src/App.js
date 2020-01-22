// import React, { Component } from 'react';
// // import logo from './logo.svg'; -------from CRA
// // import './App.css'; -------from CRA
// import LoginForm from "./components/LoginForm"
// import ChatRoom from "./components/ChatRoom"
// import ConversationsList from './components/ConversationsList';

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       userId: null,
//       username: "",
//       password: ""
//     }
//   }

//   handleLogin = (e) => {
//     e.preventDefault();
//     console.log(e.target.name)
//     if(e.target.name === "username") {
//       this.setState({
//         username: e.target.value,
//       })
//     } else if(e.target.name === "password") {
//       this.setState({
//         password: e.target.value,
//       })
//     }
//   }

//   render () {
//     return (
//       <div>
//         <LoginForm handleLogin={this.handleLogin} credientials={this.state}/>
//         <ChatRoom />
//         <ConversationsList />
//       </div>
//     );
//   }
// }

// export default App;

import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super()
    this.socket = undefined;
    this.state = {
      messages: [],
      connected: false
    };
  }

  openWsConnection = async () => {
    this.socket = await new WebSocket("ws://localhost:3000/cable");
    // this.socket.onmessage = (messageEvent) => {
    //   console.log(JSON.parse(messageEvent.data).message)
    // }

    this.socket.onopen = () => {
      let msg = {
        command: 'subscribe',
        identifier: JSON.stringify({
          channel: "MessagesChannel"
        })
      };
      this.socket.send(JSON.stringify(msg))
    }

    this.socket.addEventListener('message', (event) => {
      // build out a proper conditional statement that differentiates between
      // true messages and bullshit
      const data = JSON.parse(event.data);
      console.log(data.message);
      if (data.message === undefined || data.message.message === undefined) {
        // changed data.type = "confirm_subscription" to data.type === "confirm_subscription"
      } else if (data.type === 'confirm_subscription' && !this.state.connected && this.socket) {
        this.socket.send(JSON.stringify({
          "command": "message",
          "identifier": JSON.stringify({ channel: 'MessagesChannel' }),
          "data": JSON.stringify({
            message: 'hello-server',
            action: 'sync_reading'
          })
        }));
        this.setState({ connected: true });
        // this.setState({
        //   messages: [...this.state.messages, event.data]
        // })
      } else if (data.message.user_facing === true) {
        console.log(data.message.message);
        this.setState({
          messages: [...this.state.messages, data.message.message]
        })

      }
    });
  }

  componentDidMount() {
    this.openWsConnection();
    fetch('http://localhost:3000/messages')
      .then(res => res.json())
      .then(messages => {
        this.setState({
          messages: messages
        })
      })
  }

  render() {
    console.log(this.state.messages);
    return (
      <div className="App">
        <h1>Messages</h1>
        <ul>
          {this.state.messages.length > 0 &&
            this.state.messages.map(message => {
              return <li>{message.content}</li>
            })}
        </ul>
      </div>
    );
  }
}

export default App;
