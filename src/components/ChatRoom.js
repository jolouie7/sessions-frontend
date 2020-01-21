import React, { Component } from 'react'

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: ""
    }
  }

  addMessage = (e) => {
    e.preventDefault();
    // add new message to the conversation
    this.setState(prevState => ({
      messages: [...prevState.messages, prevState.message]
    }))
    // add message to state
    this.setState({
      message: ""
    })
    // post request to the server
    fetch('http://localhost:3000/messages', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: this.state.message,
        user_id: 1
      })
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));

    
      
  }

  componentDidMount(){
    fetch("http://localhost:3000/messages")
    .then(response => response.json())
    .then(json => json.forEach(message => this.setState({messages: this.state.messages.concat(message.text)})))
  }

  

  handleInputChange = (e) => {
    this.setState({
      message: e.target.value
    })
  }

  render() {
    return (
      <div>
        <ul>
    {this.state.messages.map(message => <h3>{message}</h3>)}
        </ul>
        <form onSubmit={this.addMessage}>
          <input type="text" value={this.state.message} onChange={this.handleInputChange}/>
          <input type="submit"/>
        </form>
        </div>
      
    )
  }
}

export default ChatRoom
