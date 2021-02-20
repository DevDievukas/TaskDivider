import React from 'react';
import usePostData from '../shared/hooks/postData-hook';
import useFetchData from '../shared/hooks/fetchData-hook';

import styles from './Announcements.module.css';
import AnnouncementItem from './AnnouncementItem';
import AnnouncementsControl from './AnnouncementsControl';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import EmptyData from '../shared/UIElements//EmptyData/EmptyData';

const Announcements = () => {
  const houseParam = useParams().houseId;
  const { token, houseId, userId } = useSelector((state) => ({
    ...state.auth,
  }));
  const loadedData = useFetchData(
    `${process.env.REACT_APP_BACKEND_URL}/announcement/allByHouse/${
      houseParam || houseId
    }`
  );
  const { post } = usePostData();
  let announcements;

  const createAnnouncement = (announcement) => {
    const addFilter = (res) => {
      if (loadedData.data) {
        loadedData.setData((prevData) => [...prevData, res]);
      } else {
        loadedData.setData([res]);
      }
    };
    post(
      `${process.env.REACT_APP_BACKEND_URL}/announcement/`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
      announcement,
      addFilter
    );
  };

  if (loadedData.dataLoaded) {
    if (loadedData.data.length > 0) {
      announcements = loadedData.data.reverse().map((ann) => {
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
    <div className={styles.announcementsDiv}>
      {userId ? (
        <AnnouncementsControl
          onCreate={createAnnouncement}
          houseParam={houseParam}
        />
      ) : null}
      <ul className={styles.groupList}>{announcements}</ul>
    </div>
  );
};

export default Announcements;
