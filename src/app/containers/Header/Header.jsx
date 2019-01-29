import React, { Component } from 'react'
import { withRouter, NavLink, Link } from 'react-router-dom'

import './Header.scss'

class Header extends Component {
    render() {
        return (
            <div className="wrapper_header bg">
                <Link className="logo" to="/">weather App</Link>
                <div className="navigation_wrapper">
                    <NavLink className="nav_header" to="/" exact activeClassName="active_nav_btn">Home</NavLink>
                    <NavLink className="nav_header" to="/cityies" exact activeClassName="active_nav_btn">Cityies</NavLink>
                    <NavLink className="nav_header" to="/forecast" exact activeClassName="active_nav_btn">Forecast Weather</NavLink>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)