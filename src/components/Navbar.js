import React, {Fragment}from 'react'
import { NavLink } from 'react-router-dom';

class Navbar extends React.Component {
    render(){
        const loggedIn = !!this.props.currentUser.id;
        console.log(loggedIn)
    return(
        <div>
            <NavLink to="/" exact >Home</NavLink>
            
            
            { loggedIn ? 
                <Fragment>
                 <NavLink to="/Profile" exact>Profile</NavLink>
                 <NavLink to='/' exact onClick={this.props.logOut}>Logout</NavLink> 
                 </Fragment> :
                 <Fragment>
                 <NavLink to="/SignUp" exact>SignUp</NavLink>
                 <NavLink to="/Login" exact>Login</NavLink>
                 </Fragment>
            }

           
        </div>
    )}

}

export default Navbar