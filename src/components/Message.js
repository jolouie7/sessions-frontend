// This might need to be a functional component (presentational comp)
import React, { Component } from 'react'

class Message extends Component {
  render() {
    console.log("from message")
    // console.log(this.props.message.content)
    return (
      <div>
        {/* This component should probably use a callback function */}
        {/* use the input to update state in Conversation Component */}
        <ul>
          <li>{this.props.message.content}</li>
        </ul>
      </div>
    )
  }
}

export default Message
