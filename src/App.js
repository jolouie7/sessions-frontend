
import React, { Component, Fragment } from 'react';
import './App.css';
import Navbar from './components/Navbar'

import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Profile from './components/Profile'
import Conversation from "./components/Conversation"

class App extends Component {
  constructor(props) {
    super()
    this.socket = undefined
    this.state = {
      currentUser: {},
      messages: [],
    };
  }

  // -----------FROM JOSEPH--------------
  openWsConnection = async () => {
    this.socket = await new WebSocket("ws://localhost:3000/cable");
    // this.socket.onmessage = (messageEvent) => {
    //   console.log(JSON.parse(messageEvent.data).message)
    // }

    this.socket.onopen = () => {
      let msg = {
        command: 'subscribe',
        identifier: JSON.stringify({
          channel: "MessagesChannel"
        })
      };
      this.socket.send(JSON.stringify(msg))
    }

    this.socket.onmessage = (event) => {
      console.log(event.data);
      // build out a proper conditional statement that differentiates between
      // true messages
      const data = JSON.parse(event.data);
      // console.log(data.message);
      // console.log(data);
      if (data.message === undefined || data.message.message === undefined) {
        // changed data.type = "confirm_subscription" to data.type === "confirm_subscription"
      } else if (data.type === 'confirm_subscription' && !this.state.connected && this.socket) {
        console.log('I"m first')
        this.socket.send(JSON.stringify({
          "command": "message",
          "identifier": JSON.stringify({ channel: 'MessagesChannel' }),
          "data": JSON.stringify({
            message: 'hello-server',
            action: 'sync_reading'
          })
        }));
        this.setState({ connected: true });
        // this.setState({
        //   messages: [...this.state.messages, event.data]
        // })
      } else if (data.message.user_facing === true) {

        this.setState((prevState) => {
          return { messages: [...prevState.messages, data.message.message] }
        })

      }
    };
  }
  // -----------FROM JOSEPH--------------

  handleLogin =(json)=>{
    const currentUser = json.user.data.attributes
    localStorage.setItem("jwt", json.jwt);
    this.setState({currentUser: currentUser})
  }

  updateUser =(json) => {

  }

  componentDidMount() {
    this.openWsConnection();
    // fetch('http://localhost:3000/messages')
    //   .then(res => res.json())
    //   .then(messages => {
    //     this.setState({
    //       messages: messages
    //     })
    //   })
  }
  handleLogout = () =>{
    localStorage.clear("jwt")
    this.setState({currentUser: {}})
  }



  render(){
    return (
      <div>
       <Navbar currentUser={this.state.currentUser} logOut={this.handleLogout}/>
       <Switch>
       <Route  exact path="/" component={Home}/>
              <Route path="/SignUp" render={routerProps => {
                return(
                  <SignUp {...routerProps} handleLogin={this.handleLogin}/>
                );
              }}
              />
       <Route 
           path="/Login" render={routerProps => {
            return(
              <Login {...routerProps} handleLogin={this.handleLogin}/> 
                );
                }}/>
       
        {
          Object.keys(this.state.currentUser).length !== 0 ? 
          <Fragment>
            <Route 
              path="/Profile" render={routerProps => {
                return(
                  <Profile {...routerProps} currentUser={this.state.currentUser} />
                )
                    }} />

                    <Route  
                    path="/Conversation" render={routerProps => {
                      return(
                        <Conversation {...routerProps} messages={this.state.messages} currentUser={this.state.currentUser}/>
                      )
                    }} />
                     </Fragment>
                     
                
                :<Fragment> <Redirect to="/Login" />
                </Fragment>}
      
              
         
          
          
          
       </Switch>
      </div>
    )
  }
}

export default App;