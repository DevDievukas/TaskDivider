import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Spinner from '../shared/Spinner/Spinner';
import ErrorModal from '../shared/UIElements/ErrorModal';
import PeopleControl from './PeopleControl';

import { AuthContext } from '../shared/Context/auth-context';
import { useLoadingHook } from '../shared/hooks/loading-hook';

import styles from './People.module.css';
import PersonElement from './PersonElement';

const Rooms = () => {
  const houseId = useParams().houseId;
  const { userId } = useContext(AuthContext);
  const [data, setData] = useState(null);

  const {
    error,
    setError,
    clearError,
    isLoading,
    setIsLoading,
  } = useLoadingHook();

  useEffect(() => {
    getPeople();
  }, []);

  const getPeople = () => {
    setIsLoading(true);
    if (houseId) {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/person/allByHouse/${houseId}`
        )
        .then((response) => {
          setIsLoading(false);
          const people = response.data.people.map((person) => person);
          setData(people);
        })
        .catch((err) => {
          setIsLoading(false);
          if (err.response) {
            setError(err.response.data.message);
          }
        });
    } else {
      axios
        .get('https://tvarkymas-4237a.firebaseio.com/Swalmen/rooms.json')
        .then((response) => {
          setIsLoading(false);
          const rooms = response.data.map((room) => room);
          setData(rooms);
        })
        .catch((err) => {
          setIsLoading(false);
          if (err.response) {
            setError(err.response.data.message);
          }
        });
    }
  };

  const PersonDeleteHandler = (deletedPersonId) => {
    const filteredData = data.filter(
      (person) => person._id !== deletedPersonId
    );
    setData(filteredData);
  };

  if (data) {
    return (
      <div className={styles.mainDiv}>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && <Spinner />}
        {userId ? <PeopleControl onCreate={getPeople} /> : null}
        {data.length <= 0 ? (
          <h1> no people</h1>
        ) : (
          <div>
            {data.map((person) => {
              return (
                <PersonElement
                  key={person._id}
                  id={person._id}
                  name={person.name}
                  rooms={person.rooms}
                  onDelete={PersonDeleteHandler}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
  return <Spinner />;
};

export default Rooms;
