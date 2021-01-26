import React, { useContext } from 'react';

import { useParams } from 'react-router-dom';
import { AuthContext } from '../Context/auth-context';

import HouseNavbarItem from './HouseNavbarItem';

import styles from './HouseNavbar.module.css';

const HouseNavbar = () => {
  const houseId = useParams().houseId;
  const { userId } = useContext(AuthContext);

  const houseNavbar = (
    <header className={styles.navbar}>
      <div className={styles.section}>
        <HouseNavbarItem direction={`/${houseId}/rooms`} title="Rooms" />
        <HouseNavbarItem direction={`/${houseId}/schedule`} title="Schedule" />
        {userId ? (
          <HouseNavbarItem direction={`/${houseId}/people`} title="People" />
        ) : null}
      </div>
      <div className={styles.section}>
        <HouseNavbarItem
          direction={`/${houseId}/announcements`}
          title="Announcements"
        />
        <HouseNavbarItem
          direction={`/${houseId}/sharedItems`}
          title="Requests"
        />{' '}
      </div>
    </header>
  );

  return houseNavbar;
};

export default HouseNavbar;
