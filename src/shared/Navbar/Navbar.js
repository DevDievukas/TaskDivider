import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { SignOut } from 'phosphor-react';
import styles from './Navbar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout, startLogout } from '../../Store/actions/Auth';

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state);

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

  if (auth.userId) {
    linkDirection = '/houses';
  } else if (auth.houseId) {
    linkDirection = `/${auth.houseId}/announcements`;
    leftButton = <h3>{auth.houseName}</h3>;
  }

  const navbar = (
    <React.Fragment>
      <header className={styles.navbar}>
        <Link className={styles.navbarBrand} to={`${linkDirection}`}>
          {leftButton}
        </Link>
        {auth.token ? rightButton : null}
      </header>
    </React.Fragment>
  );

  return navbar;
};

export default Navbar;
