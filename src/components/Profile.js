import React, { Component } from 'react'

class Profile extends Component {
  constructor(props) {
    super();
    this.state = {

    }
  }
  render() {
    return (
      <div>
        {/* might need a componentDidMount to get the user info from the database */}
        {/* In componentDidMount setState with user info */}
        {/* render user info using from data from this.state */}
        <h3>User Pic</h3>
        <h3>Name</h3>
        <h3>Username</h3>
        <h3>Bio</h3>
        <h3>Location</h3>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    )
  }
}

export default Profile
