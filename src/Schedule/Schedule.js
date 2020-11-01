import React, { useEffect, useState } from 'react';
import axios from 'axios';

import GroupElement from './GroupElement';
import Spinner from '../shared/Spinner/Spinner';

import styles from './Schedule.module.css';

const Schedule = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = () => {
    axios
      .get('https://tvarkymas-4237a.firebaseio.com/Swalmen/Complete.json')
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
          {data.map((person) => {
            return (
              <GroupElement
                key={person.name}
                id={person.name}
                person={person}
              />
            );
          })}
        </ul>
      </React.Fragment>
    );
  }
  return <Spinner />;
};

export default Schedule;
