import React, { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './Announcements.module.css';
import AnnouncementItem from './AnnouncementItem';
import Spinner from '../shared/Spinner/Spinner';
import AnnouncementsControl from './AnnouncementsControl';
import { useParams } from 'react-router';

const Announcements = (props) => {
  const [data, setData] = useState(null);
  const houseId = useParams().houseId;
  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = () => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/announcement/allByHouse/${houseId}`
      )
      .then((response) => {
        setData(response.data.announcements);
      })
      .catch((err) => {
        console.log('[annnouncement][fail]' + err);
      });
  };
  if (!data) {
    return <Spinner />;
  }

  return (
    <ul className={styles.groupList}>
      <AnnouncementsControl />
      {data.reverse().map((ann) => {
        console.log(ann.title);
        if (ann) {
          return (
            <AnnouncementItem
              key={ann._id}
              title={ann.title}
              text={ann.body}
              // date={ann.date}
              img={ann.image}
              link={ann.link}
            />
          );
        } else {
          return;
        }
      })}
    </ul>
  );
};

export default Announcements;
