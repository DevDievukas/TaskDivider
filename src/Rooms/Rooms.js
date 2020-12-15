import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Spinner from '../shared/Spinner/Spinner';

import styles from './Rooms.module.css';
import RoomElement from './RoomElement';

const Rooms = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    getRooms();
  }, []);

  const getRooms = () => {
    axios
      .get('https://tvarkymas-4237a.firebaseio.com/Swalmen/rooms.json')
      .then((response) => {
        const tempArray = [];
        for (let [key, value] of Object.entries(response.data)) {
          tempArray.push(value);
        }
        setData(tempArray);
      })
      .catch((err) => {
        console.log('[main][fail]' + err);
      });
  };

  if (data) {
    return (
      <React.Fragment>
        <ul className={styles.groupList}>
          {data.map((room) => {
            return (
              <RoomElement
                key={room.name}
                id={room.name}
                images={room.images}
                people={room.people}
              />
            );
          })}
        </ul>
      </React.Fragment>
    );
  }
  return <Spinner />;
};

export default Rooms;
