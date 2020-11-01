import React, { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './Announcements.module.css';
import AnnouncementItem from './AnnouncementItem';
import Spinner from '../shared/Spinner/Spinner';

const Announcements = (props) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = () => {
    axios
      .get('https://tvarkymas-4237a.firebaseio.com/Swalmen/Announcements.json')
      .then((response) => {
        const tempArray = [];
        for (let [key, value] of Object.entries(response.data)) {
          tempArray.push(value);
        }
        setData(tempArray);
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
      {data.map((ann) => {
        if (ann) {
          return (
            <AnnouncementItem
              key={ann.title}
              title={ann.title}
              text={ann.body}
              date={ann.date}
              img={ann.img}
            />
          );
        }
      })}
    </ul>
  );
};

export default Announcements;
