import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { SignOut, House } from 'phosphor-react';
import styles from './Navbar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../Store/actions/Auth';
const Navigation = styled.header`
  background-color: ${(props) => props.theme.charcoal};
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userId, houseId, houseName, token } = useSelector((state) => ({
    ...state.auth,
  }));

  let leftButton;

  const redirectLogout = () => {
    dispatch(startLogout());
    history.push('/');
  };

  let linkDirection = '/';
  if (userId) {
    leftButton = <House className={styles.logo} size={42} />;
  }
  let rightButton = (
    <div className={styles.signOutDiv}>
      <SignOut size={35} />
      <h5 onClick={redirectLogout}>SIGN OUT</h5>
    </div>
  );

  if (houseId) {
    leftButton = <h3 className={styles.logoText}>{houseName}</h3>;
  }

  const navbar = (
    <Navigation className={styles.navbar}>
      <Link className={styles.navbarBrand} to={`${linkDirection}`}>
        {leftButton}
      </Link>
      {token ? rightButton : null}
    </Navigation>
  );

  return navbar;
};

export default Navbar;
