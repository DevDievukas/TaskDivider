import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { AuthContext } from '../Context/auth-context';

import { SignOut } from 'phosphor-react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const history = useHistory();
  const { userId, houseId, token, name, logout } = useContext(AuthContext);

  const redirectLogout = () => {
    logout();
    history.push('/');
  };

  let rightButton = (
    <div className={styles.signOutDiv}>
      <SignOut size={30} />
      <p onClick={redirectLogout}>SIGN OUT</p>
    </div>
  );
  let leftButton = (
    <img
      alt="logo"
      className={styles.logo}
      src="https://www.freepnglogos.com/uploads/islamic-png/abstract-arabesque-arabic-geometric-islamic-art-20.png"
    />
  );
  let linkDirection = '/';

  if (userId) {
    linkDirection = '/houses';
  } else if (houseId) {
    linkDirection = `/${houseId}/announcements`;
    leftButton = <h3>{name}</h3>;
  }

  const navbar = (
    <React.Fragment>
      <header className={styles.navbar}>
        <Link className={styles.navbarBrand} to={`${linkDirection}`}>
          {leftButton}
        </Link>
        {token ? rightButton : null}
      </header>
    </React.Fragment>
  );

  return navbar;
};

export default Navbar;
