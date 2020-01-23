import React from 'react'
import { NavLink } from 'react-router-dom';

class Navbar extends React.Component {
    render(){
    return(
        <div>
            <NavLink to="/" exact >Home</NavLink>
            
            <NavLink to="/SignUp" exact>SignUp</NavLink>
            <NavLink to="/Login" exact>Login</NavLink>
            <NavLink to="/Profile" exact>Profile</NavLink>
        </div>
    )}

}

export default Navbar