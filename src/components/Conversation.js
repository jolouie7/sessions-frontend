import React, { Component } from 'react';
import Message from "./Message";
import InputMessageForm from './InputMessageForm';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { API_ROOT, API_WS_ROOT, HEADERS } from "../constants/index 2"

class Conversation extends Component {
  constructor(props) {
    super();
    this.state = {
      message: ""
    }
  }

  // appends new message to messages in state
  changeMessage = (e) => {
    console.log(e.target.value)
    this.setState({message: e.target.value})
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log(prevState)
  //   console.log(prevProps)
  //   let message = this.state.message;
  //   if(prevState.messages !== this.state.messages) {
  //     this.setState((prevState) => ({
  //       messages: [...prevState.messages, message]
  //     }))
  //   }
  // }

  // addToMessageList = (message) => {
  //   // e.preventDefault();
  //   console.log(message)
  //   this.setState((prevState) => ({
  //     messages: [...prevState.messages, message]
  //   }));
  // }
  handleSubmit = (e) => {
    e.preventDefault();
    fetch(API_ROOT + "/messages", {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        content: this.state.message,
        user_id: 1,
        conversation_id: 1
      })
    })
    
    // console.log("from parent handleSubmit")
    // console.log(e)
    // this.setState(prevState => {
    //   return {
    //     messages: [...this.props.messages, prevState.message]
    //   }
    // })
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
        {this.props.messages.map(message => <Message message={message}/>)}
        <InputMessageForm message={this.state.message} 
        handleSubmit={this.handleSubmit} 
        changeMessage={this.changeMessage}/>
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
