import React, { Component } from 'react'

class SignUp extends Component {
  render() {
    return (
      <div>
        {/* make a fetch POST request after the user submits the form to the DB to add the user info */}
        {/* after the user signs up, bring them to the home page? */}
        Sign Up
        <input type="text" name="username"></input>
        <input type="password" name="password"></input>
        <input type="submit"></input>
      </div>
    )
  }
}

export default SignUp
