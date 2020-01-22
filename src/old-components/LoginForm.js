import React, { Component } from 'react'

class LoginForm extends Component {
  render() {
    return (
      <div>
        Login
        <form onSubmit={this.props.handleLogin}>
          <input type="text" placeholder="enter username" value={this.props.credientials.username} onChange={this.props.handleLogin} name="username"/>
          <input type="password" placeholder="enter password" value={this.props.credientials.password} onChange={this.props.handleLogin} name="password"/>
          <input type="submit" value="Login" />
        </form>
        <h1>{this.props.credientials.username}</h1>
        <h1>{this.props.credientials.password}</h1>
      </div>
    )
  }
}

export default LoginForm
