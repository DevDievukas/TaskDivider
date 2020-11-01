import React from 'react';
import { Link } from 'react-router-dom';

import styles from './SideDrawerNav.module.css';

const SideDrawerNav = (props) => {
  return (
    <React.Fragment>
      <div className={styles.sidedrawerHeader}>
        {/* <Link className="dropdown-item profile" to="/profile">
          {props.name}
        </Link> */}
        <Link
          className={(styles.dropdownItem, styles.profile)}
          to="/announcements"
        >
          <h4>Swalmen</h4>
        </Link>
      </div>
      <nav className={styles.mainNavigationDrawer}>
        <Link className={styles.dropdownItem} to="/schedule">
          Tvarkaraštis
        </Link>
        <Link className={styles.dropdownItem} to="/shareditems">
          Bendri daiktai
        </Link>
        <Link className={styles.dropdownItem} to="/announcements">
          Pranešimai
        </Link>
        {/* <Link className="dropdown-item logout" to="#" onClick={props.logout}>
          Logout
        </Link> */}
      </nav>
    </React.Fragment>
  );
};

export default SideDrawerNav;
