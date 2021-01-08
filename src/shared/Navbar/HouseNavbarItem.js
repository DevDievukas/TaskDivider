import React from 'react';

import { Link } from 'react-router-dom';

import styles from './HouseNavbar.module.css';

const HouseNavbarItem = (props) => {
  return (
    <Link to={props.direction} className={styles.link}>
      <h4>{props.title}</h4>
    </Link>
  );
};

export default HouseNavbarItem;
