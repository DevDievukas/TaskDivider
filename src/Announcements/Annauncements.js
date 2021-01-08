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
        const tempArray2 = [];
        try {
          for (let [key, value] of Object.entries(response.data)) {
            tempArray.push(value);
          }
        } catch (err) {
          console.log(err);
        }
        try {
          for (let i = 0; i < 3; i++) {
            tempArray2.push(tempArray[tempArray.length - 1 - i]);
          }
          tempArray2.reverse();
        } catch (err) {
          console.log(err);
        }
        setData(tempArray2);
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
      {data.reverse().map((ann) => {
        if (ann) {
          return (
            <AnnouncementItem
              key={ann.date}
              title={ann.title}
              text={ann.body}
              date={ann.date}
              img={ann.img}
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
