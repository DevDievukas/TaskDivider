import React from 'react';
import { Link } from 'react-router-dom';

import { CalendarBlank, BellSimple, BookOpen, House } from 'phosphor-react';

import styles from './SideDrawerNav.module.css';

const SideDrawerNav = (props) => {
  const { token, logout } = props;
  return (
    <React.Fragment>
      <div className={styles.sidedrawerHeader}>
        <Link className="dropdown-item profile" to="/profile">
          {/* {email} */}
        </Link>
        <Link className={styles.dropdownItem} to="/announcements">
          <h4 className={styles.sidedrawerHeaderTitle}>Swalmen</h4>
        </Link>
      </div>
      <nav className={styles.mainNavigationDrawer}>
        <Link className={styles.dropdownItem} to="/announcements">
          <div className={styles.pair}>
            <BellSimple size={20} />
            Pranešimai
          </div>
        </Link>
        <Link className={styles.dropdownItem} to="/schedule">
          <div className={styles.pair}>
            <CalendarBlank size={20} />
            Tvarkaraštis
          </div>
        </Link>
        <Link className={styles.dropdownItem} to="/shareditems">
          <div className={styles.pair}>
            <BookOpen size={20} />
            Prašymai
          </div>
        </Link>
        <Link className={styles.dropdownItem} to="/rooms">
          <div className={styles.pair}>
            <House size={20} />
            Kambariai
          </div>
        </Link>
        {token ? (
          <p className="dropdown-item logout" onClick={logout}>
            Logout
          </p>
        ) : (
          <Link className="dropdown-item logout" to="/auth">
            Login
          </Link>
        )}
      </nav>
    </React.Fragment>
  );
};

export default SideDrawerNav;
