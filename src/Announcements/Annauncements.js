import React from 'react';

import styles from './Announcements.module.css';
import AnnouncementItem from './AnnouncementItem';
import AnnouncementsControl from './AnnouncementsControl';
import { useParams } from 'react-router';
import { useLoadData } from '../shared/hooks/loadData-hook';
import { useSelector } from 'react-redux';
import EmptyData from '../shared/UIElements//EmptyData/EmptyData';

const Announcements = () => {
  const houseParam = useParams().houseId;
  const { token, houseId } = useSelector((state) => ({ ...state.auth }));
  const { data, dataLoaded, postData } = useLoadData(
    `${process.env.REACT_APP_BACKEND_URL}/announcement/allByHouse/${
      houseParam || houseId
    }`
  );
  let announcements;

  const createAnnouncement = (announcement) => {
    postData(
      `${process.env.REACT_APP_BACKEND_URL}/announcement/`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
      announcement
    );
  };

  if (dataLoaded) {
    if (data.length > 0) {
      announcements = data.reverse().map((ann) => {
        return (
          <AnnouncementItem
            key={ann._id}
            title={ann.title}
            text={ann.body}
            img={ann.image}
            link={ann.link}
            date={ann.date}
          />
        );
      });
    } else {
      announcements = <EmptyData header="NO ANNOUNCEMENTS!" />;
    }
  }

  return (
    <ul className={styles.groupList}>
      <AnnouncementsControl
        onCreate={createAnnouncement}
        houseParam={houseParam}
      />
      {announcements}
    </ul>
  );
};

export default Announcements;
