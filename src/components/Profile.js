import React, { Component } from 'react'

class Profile extends Component {
  constructor(props) {
    super();
    this.state = {
      currentUser: {}
    }
  }

  componentDidMount(){
  const token = localStorage.getItem("jwt")
    if (token === null) {
      this.props.history.push('/Login');
    } else {
      fetch('http://localhost:3000/profile', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
            Accept: 'application/json',
           Authorization: `Bearer ${token}`
        },


      })
      .then(response => response.json())
      .then(json => { this.setState({currentUser: json.user.data.attributes})

      })
    }
      
  }

  handleEditClick = (event) => {
    event.preventDefault()
    console.log(event)
  }

  handleDeleteClick = (event) => {
    event.preventDefault()
  }
  
  render() {
    
    
    return (
      <div>
      
       <center>
        <h3>{this.state.currentUser.name}</h3>
         <h3>{this.state.currentUser.username}</h3>
        <h3>{this.state.currentUser.bio}</h3>
         <h3>{this.state.currentUser.location}</h3>
        <button onClick={this.handleEditClick}>Edit</button>
        <button>Delete</button>
        </center>
      </div>
    )
  }
}

export default Profile
