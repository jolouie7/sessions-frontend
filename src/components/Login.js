import React, { Component } from 'react'

class Login extends Component {
  constructor(){
    super()
    this.state = {
      error: false,
      username: '',
      password: ''
      
    };
  }
    
  handleSubmit = (event) => {
    const username = this.state.username
    const password =this.state.password
    event.preventDefault()
    fetch('http://localhost:3000/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json'
      },
      body: JSON.stringify({user:{username, password}})
    })
    .then(response => response.json())
    .then(json =>{
      if ( json.error ) {
        this.setState({ error: true })

    }
    else {
      this.props.handleLogin(json);
        this.props.history.push('/Profile');
      };
    })

  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }
  
  render() {
    return (
      <div>
        <center>
          <div>
            <h1>Please Login</h1>
          </div>
          <div >{this.state.error ? <h1>Try Again</h1> : null}</div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <label>Username</label>
              </div>
              <div>
                <input 
                  onChange={this.handleChange} 
                  placeholder="username"
                  name= "username"
                  value={this.state.username}/>
                </div>
                <div>
                  <label>Password</label>
                </div>
                <div>
                  <input 
                  type="password"
                    onChange={this.handleChange}
                    placeholder="password"
                    name="password"
                    value={this.state.password}/>
                </div>
                <div>
                  <input type="submit"></input>
                </div>

            </form>
        </center>
      </div>
    )
  }
}

export default Login
