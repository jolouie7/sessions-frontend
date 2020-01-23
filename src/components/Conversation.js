import React, { Component } from 'react';
import Message from "./Message";
import InputMessageForm from './InputMessageForm';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { API_ROOT, API_WS_ROOT, HEADERS } from "../constants/index 2"

class Conversation extends Component {
  constructor(props) {
    super();
    this.state = {
      messages: ["hi", "hello", "how are you", "good"],
      message: ""
    }
  }

  // appends new message to messages in state
  changeMessage = (e) => {
    console.log(e.target.value)
    this.setState({message: e.target.value})
  }

  // addToMessageList = (message) => {
  //   // e.preventDefault();
  //   console.log(message)
  //   this.setState((prevState) => ({
  //     messages: [...prevState.messages, message]
  //   }));
  // }
  handleSubmit = (e) => {
    e.preventDefault()
    console.log("from parent handleSubmit")
    console.log(e)
    this.setState(prevState => {
        return {
          messages: [...prevState.messages, prevState.message]
        }
    })
    fetch(`${API_ROOT}/messages`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        content: this.state.message,
        user_id: 1,
        conversation_id: 1
      })
    })
    .then(res => res.json())
    .then(json => console.log(json))
  }

  handleReceived(message) {
    this.setState(state => {
      return {
        message
      };
    });
  }

  render() {
    return (
      <div>
        {/* get all the messages in conversation and pass them into message component. */}
        {/* message component will render the messages */}
        {this.state.messages.map(message => <Message message={message}/>)}
        <form>
          <InputMessageForm m={this.state.message} 
          handleSubmit={this.handleSubmit} 
          changeMessage={this.changeMessage} 
          messageInput={this.state.messageInput}/>
        </form>
        {/* <ActionCableConsumer
          channel="message_channel"
          onReceived={this.handleReceived}
        >
          <h1>{this.state.message}</h1>
        </ActionCableConsumer> */}
      </div>
    )
  }
}

export default Conversation
