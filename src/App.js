
import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar'

import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Profile from './components/Profile'

class App extends Component {

  constructor(props) {
    super()
    this.state = {
      currentUser: {}
    };
  }

  handleLogin =(json)=>{
    const currentUser = json.user.data.attributes
    localStorage.setItem("jwt", json.jwt);
    this.setState({currentUser: currentUser})
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
        <Route 
           path="/Profile" render={routerProps => {
            return(
              <Profile {...routerProps} currentUser={this.state.currentUser} />
            )
            }}/> : <Redirect to="/Login"/> }
          
       </Switch>
      
     
      </div>
    )
  }

  
}

export default App;
