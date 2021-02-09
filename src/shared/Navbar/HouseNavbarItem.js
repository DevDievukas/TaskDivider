import React from 'react';

import { Link } from 'react-router-dom';

import styles from './HouseNavbar.module.css';

const HouseNavbarItem = (props) => {
  const { direction, title } = props;
  return (
    <Link to={direction} className={styles.link}>
      <h4>{title}</h4>
    </Link>
  );
};

export default HouseNavbarItem;
