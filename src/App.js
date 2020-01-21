import React, { Component } from 'react';
// import logo from './logo.svg'; -------from CRA
// import './App.css'; -------from CRA
import LoginForm from "./components/LoginForm"
import ChatRoom from "./components/ChatRoom"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      username: "",
      password: ""
    }
  }

  handleLogin = (e) => {
    e.preventDefault();
    console.log(e.target.name)
    if(e.target.name === "username") {
      this.setState({
        username: e.target.value,
      })
    } else if(e.target.name === "password") {
      this.setState({
        password: e.target.value,
      })
    }
  }

  render () {
    return (
      <div>
        <LoginForm handleLogin={this.handleLogin} credientials={this.state}/>
        <ChatRoom />
      </div>
    );
  }
}

export default App;