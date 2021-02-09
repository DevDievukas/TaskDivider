import React from 'react';

import { useParams } from 'react-router-dom';

import HouseNavbarItem from './HouseNavbarItem';

import styles from './HouseNavbar.module.css';
import { useSelector } from 'react-redux';

const HouseNavbar = () => {
  const houseParam = useParams().houseId;
  const { userId } = useSelector((state) => ({ ...state.auth }));

  let houseNavbar;
  if (userId) {
    houseNavbar = (
      <header className={styles.navbar}>
        <div className={styles.section}>
          <HouseNavbarItem direction={`/${houseParam}/rooms`} title="Rooms" />
          <HouseNavbarItem
            direction={`/${houseParam}/schedule`}
            title="Schedule"
          />

          <HouseNavbarItem direction={`/${houseParam}/people`} title="People" />
        </div>
        <div className={styles.section}>
          <HouseNavbarItem
            direction={`/${houseParam}/announcements`}
            title="Announcements"
          />
          <HouseNavbarItem
            direction={`/${houseParam}/sharedItems`}
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
