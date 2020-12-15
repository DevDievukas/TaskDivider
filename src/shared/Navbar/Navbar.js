import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Backdrop from '..//UIElements/Backdrop';
import SideDrawer from '../SideDrawer/SideDrawer';
import SideDrawerNav from './SideDrawerNav';
import { AuthContext } from '../Context/auth-context';

import styles from './Navbar.module.css';

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const [drawerIsOpen, setDrawerisOpen] = useState(false);
  let rightButton;

  const openDrawerHandler = () => {
    setDrawerisOpen(true);
  };

  const closeSdrawerHandler = () => {
    setDrawerisOpen(false);
  };
  let linkDirection = '/';

  if (token) {
    rightButton = (
      <h1 className={styles.mainNavigationTitle}>
        {' '}
        <button
          className={styles.mainNavigationMenuBtn}
          onClick={openDrawerHandler}
        >
          <span /> <span /> <span />
        </button>
      </h1>
    );
  } else {
    rightButton = (
      <Link className={styles.authButton} to="/auth">
        Login/Signup
      </Link>
    );
  }

  const navbar = (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeSdrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeSdrawerHandler}>
        <SideDrawerNav token={token} logout={logout} />
      </SideDrawer>
      <header className={styles.navbar}>
        <Link className={styles.navbarBrand} to={`${linkDirection}`}>
          <img
            alt="logo"
            className={styles.logo}
            src="https://www.freepnglogos.com/uploads/islamic-png/abstract-arabesque-arabic-geometric-islamic-art-20.png"
          />
        </Link>
        {rightButton}
      </header>
    </React.Fragment>
  );

  return navbar;
};

export default Navbar;
