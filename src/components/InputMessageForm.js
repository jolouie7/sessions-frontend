import React, { Component } from 'react'

class InputMessageForm extends Component {
  constructor(props) {
    super();
    // this.state = {
    //   message: ""
    // }
  }

  // handleChange = (e) => {
  //   this.setState({message : e.target.value})
  // }

  // handleSubmit = (e) => {
  //   console.log('handlesSubmit from child', e)
  // }

  render() {
    return (
      <div>
        <h3>asd</h3>
        <form onSubmit={this.props.handleSubmit}>
          <input value={this.props.message} onChange={this.props.changeMessage}></input>
          <input type="submit"></input>
        </form>
      </div>
    )
  }
}

export default InputMessageForm
