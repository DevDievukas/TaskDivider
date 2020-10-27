import React from 'react';
import { Link } from 'react-router-dom';

import './SideDrawerNav.css'

const SideDrawerNav = (props) => {
  return (
    <React.Fragment>
      <div className="sidedrawer-header">
      <Link className="dropdown-item profile" to="/profile" >{props.name}</Link>
      </div>
    <nav className="main-navigation__drawer-nav">
      <Link className="dropdown-item" to="/main">
        My groups
      </Link>
      <Link className="dropdown-item" to="/addgroup">
        Add group
      </Link>
      <Link className="dropdown-item logout" to="#" onClick={props.logout}>
        Logout
      </Link>
    </nav>
    </React.Fragment>
  )
}

export default SideDrawerNav;