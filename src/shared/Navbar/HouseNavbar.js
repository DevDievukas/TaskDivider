import React from 'react';

import { useParams } from 'react-router-dom';

import HouseNavbarItem from './HouseNavbarItem';

import styles from './HouseNavbar.module.css';
import { useSelector } from 'react-redux';

const HouseNavbar = () => {
  const houseId = useParams().houseId;
  const { userId } = useSelector((state) => state);

  let houseNavbar;
  if (userId) {
    houseNavbar = (
      <header className={styles.navbar}>
        <div className={styles.section}>
          <HouseNavbarItem direction={`/${houseId}/rooms`} title="Rooms" />
          <HouseNavbarItem
            direction={`/${houseId}/schedule`}
            title="Schedule"
          />

          <HouseNavbarItem direction={`/${houseId}/people`} title="People" />
        </div>
        <div className={styles.section}>
          <HouseNavbarItem
            direction={`/${houseId}/announcements`}
            title="Announcements"
          />
          <HouseNavbarItem
            direction={`/${houseId}/sharedItems`}
            title="Requests"
          />
        </div>
      </header>
    );
  } else {
    houseNavbar = (
      <header className={styles.navbar}>
        <div className={styles.section}>
          <HouseNavbarItem direction={`/rooms`} title="Rooms" />
          <HouseNavbarItem direction={`/schedule`} title="Schedule" />
        </div>
        <div className={styles.section}>
          <HouseNavbarItem direction={`/`} title="Announcements" />
          <HouseNavbarItem direction={`/sharedItems`} title="Requests" />{' '}
        </div>
      </header>
    );
  }

  return houseNavbar;
};

export default HouseNavbar;
