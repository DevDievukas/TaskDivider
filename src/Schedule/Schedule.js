import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { useLoadingHook } from '../shared/hooks/loading-hook';
import { AuthContext } from '../shared/Context/auth-context';

import GroupElement from './GroupElement';
import Spinner from '../shared/Spinner/Spinner';
import ErrorModal from '../shared/UIElements/ErrorModal';

import styles from './Schedule.module.css';

const Schedule = () => {
  const [data, setData] = useState(null);

  const { token, userId } = useContext(AuthContext);
  const houseId = useParams().houseId;
  const {
    error,
    setError,
    clearError,
    isLoading,
    setIsLoading,
  } = useLoadingHook();
  useEffect(() => {
    getGroups();
  }, []);

  const generateSchedule = () => {
    if (houseId) {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/room/generateSchedule/${houseId}`,
          null,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data);
            setError(err.response.data.message);
          }
        });
    }
  };

  const getGroups = () => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/room/Schedule/${houseId}`)
      .then((response) => {
        setIsLoading(false);
        setData(response.data.schedule);
      })
      .catch((err) => {
        setIsLoading(false);

        if (err.response) {
          setError(err.response.data.message);
        }
      });
  };

  return (
    <div className={styles.scheduleDiv}>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <Spinner />}
      {userId ? (
        <button onClick={generateSchedule} className={styles.generateBtn}>
          GENERATE SCHEDULE
        </button>
      ) : null}
      {data ? (
        <React.Fragment>
          <h2 className={styles.date}>{data.date.split('T')[0]}</h2>
          <ul className={styles.groupList}>
            {data.list.map((person) => {
              return (
                <GroupElement
                  key={person.name}
                  id={person.name}
                  name={person.name}
                  rooms={person.rooms}
                />
              );
            })}
          </ul>
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default Schedule;
