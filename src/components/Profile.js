import React, { Component } from 'react'

class Profile extends Component {
  constructor(props) {
    super();
    this.state = {

    }
  }

  componentDidMount(){
  
    if (localStorage.getItem("jwt") === null) {
      this.props.history.push('/Login');
    } 
      
  }
  
  render() {
    const currentUser = this.props.currentUser
    
    return (
      <div>
      
       <center>
        <h3>{currentUser.name}</h3>
         <h3>{currentUser.username}</h3>
        <h3>{currentUser.bio}</h3>
         <h3>{currentUser.location}</h3>
        <button>Edit</button>
        <button>Delete</button>
        </center>
      </div>
    )
  }
}

export default Profile
