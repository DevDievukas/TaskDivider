import React from 'react';
import { Link } from 'react-router-dom';

const SideDrawerNav = (props) => {
  return (
    <nav className="main-navigation__drawer-nav">
      <Link className="dropdown-item" to="/profile">
        Profile
      </Link>
      <Link className="dropdown-item" to="/groups">
        My groups
      </Link>
      <Link className="dropdown-item" to="/addgroup">
        Add group
      </Link>
      <Link className="dropdown-item" to="/mytasks">
        My tasks
      </Link>
      <Link className="dropdown-item" to="#" onClick={props.logout}>
        Logout
      </Link>
    </nav>
  )
}

export default SideDrawerNav;