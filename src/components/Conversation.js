import React, { Component } from 'react'

class Conversation extends Component {
  constructor(props) {
    super();
    this.state = {
      messages: []
    }
  }
  render() {
    return (
      <div>
        {/* get all the messages in conversation and pass them into message component. */}
        {/* message component will render the messages */}
      </div>
    )
  }
}

export default Conversation
