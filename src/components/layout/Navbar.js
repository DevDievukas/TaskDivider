import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

import Backdrop from '../../shared/UIElements/Backdrop';
import SideDrawer from '../../shared/SideDrawer/SideDrawer';
import SideDrawerNav from './SideDrawerNav';
import { AuthContext } from '../../shared/Context/auth-context';

import './Navbar.css';

const Navbar = (props) => {
  const auth = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [drawerIsOpen, setDrawerisOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerisOpen(true);
  };

  const closeSdrawerHandler = () => {
    setDrawerisOpen(false);
  };
  let linkDirection = '/';

  const history = useHistory();

  // let rightButton = (
  //   <Link className="navbar-brand" to="/auth">
  //     <p>Login</p>
  //   </Link>
  // );

  const logout = () => {
    props.signout();
    firebase.auth().signOut();
    history.push('/');
  };
  //
  // if (auth.isLoggedIn) {
  const rightButton = (
    <h1 className="main-navigation__title">
      {' '}
      <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
        <span /> <span /> <span />
      </button>
    </h1>
  );
  // linkDirection = '/main';
  // setIsLoggedIn(true);
  // }

  console.log('[navbar] ' + auth.isLogedIn);
  const text = 'Usernameisverr';

  const navbar = (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeSdrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeSdrawerHandler}>
        <SideDrawerNav logout={logout} name={text} />
      </SideDrawer>
      <header className="navbar">
        <Link className="navbar-brand" to={`${linkDirection}`}>
          <svg
            width="2em"
            height="2em"
            viewBox="0 0 16 16"
            className="bi bi-command"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3.5 2a1.5 1.5 0 1 0 0 3H5V3.5A1.5 1.5 0 0 0 3.5 2zM6 5V3.5A2.5 2.5 0 1 0 3.5 6H5v4H3.5A2.5 2.5 0 1 0 6 12.5V11h4v1.5a2.5 2.5 0 1 0 2.5-2.5H11V6h1.5A2.5 2.5 0 1 0 10 3.5V5H6zm4 1H6v4h4V6zm1-1h1.5A1.5 1.5 0 1 0 11 3.5V5zm0 6v1.5a1.5 1.5 0 1 0 1.5-1.5H11zm-6 0H3.5A1.5 1.5 0 1 0 5 12.5V11z"
            />
          </svg>
        </Link>
        {rightButton}
      </header>
    </React.Fragment>
  );

  return navbar;
};

export default Navbar;
