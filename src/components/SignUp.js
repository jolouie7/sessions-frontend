import React, { Component } from 'react'
import { API_ROOT } from "../constants/index"

class SignUp extends Component {
  constructor(){
    super()
    this.state = {
      error: false,
      user: {
      name: "",
      username: "",
      password: "",
      password_confirmation: "",
      bio: "",
      location: ""}
    }
  }

  handleChange = (event) => {
    const newUser = { ...this.state.user, [event.target.name]: event.target.value };
    this.setState({user: newUser})
  }

  handleSubmit = (event) => {

    event.preventDefault()
    const user = this.state.user
    fetch(API_ROOT + '/users', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
       },
       body: JSON.stringify({user})
    }) 

    .then(response => response.json())
    .then(json => {
      if ( json.error ) {
        this.setState({ error: true })

    }
    else {
      this.props.handleLogin(json);
        this.props.history.push('/Profile');
      };
    })
  }
  

  render() {
    return (
      <div>
          <center>
            <h1>Sign Up</h1>
            <div>{this.state.error ? <h1>Try Again</h1> : null}</div>
              <div>
                <form id="user-signup" onSubmit={this.handleSubmit}>
                  <div>
                  <label>Enter Name</label>
                  </div>
                  <div>
                  <input 
                    type="text" 
                    name="name" 
                    onChange={this.handleChange} 
                    value={this.state.name}></input>
                  </div>
                  <div>
                  <label>Enter Username</label>
                  </div>
                  <input 
                    type="text" 
                    name="username" 
                    onChange={this.handleChange} 
                    value={this.state.username}></input>
                  <div>
                  <label>Enter Password</label>
                  </div>
                  <input 
                    type="password" 
                    name="password" 
                    onChange={this.handleChange} 
                    value={this.state.password}></input>
                  <div>
                  <label>Confirm Password</label>
                  </div>
                  <input 
                    type="password" 
                    name="password_confirmation" 
                    onChange={this.handleChange} v
                    alue={this.state.passwordConfirmation}></input>
                  <div>
                  <label>Bio</label>
                  </div>
                  <div>
                  <input 
                    type="bio" 
                    name="bio" 
                    onChange={this.handleChange} 
                    value={this.state.bio}></input>
                  </div>
                  <div>
                  <label>Location</label>
                  </div>
                  <div>
                  <input 
                    type="location" 
                    name="location"  
                    onChange={this.handleChange}
                    value={this.state.location}></input>
                  </div>
                  <div>
                  <input type="submit" ></input>
                  </div>
                </form >
              </div>
          </center>
        
      </div>
    )
  }
}

export default SignUp
