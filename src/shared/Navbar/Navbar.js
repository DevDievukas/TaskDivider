import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { SignOut } from 'phosphor-react';
import styles from './Navbar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../Store/actions/Auth';
const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userId, houseId, houseName, token } = useSelector((state) => ({
    ...state.auth,
  }));

  const redirectLogout = () => {
    dispatch(startLogout());
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
    linkDirection = '/';
  } else if (houseId) {
    linkDirection = `/announcements`;
    leftButton = <h3>{houseName}</h3>;
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
