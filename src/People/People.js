import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Spinner from '../shared/Spinner/Spinner';
import ErrorModal from '../shared/UIElements/ErrorModal';
import PeopleControl from './PeopleControl';

import styles from './People.module.css';
import PersonElement from './PersonElement';
import { useSelector, useDispatch } from 'react-redux';
import {
  createError,
  startLoading,
  stopLoading,
} from '../Store/actions/Loading';

const Rooms = () => {
  const dispatch = useDispatch();
  const houseParam = useParams().houseId;
  const { userId, token } = useSelector((state) => ({ ...state.auth }));
  const [data, setData] = useState(null);

  useEffect(() => {
    getPeople();
  }, []);

  const getPeople = () => {
    dispatch(startLoading());
    if (houseParam) {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/person/allByHouse/${houseParam}`
        )
        .then((response) => {
          dispatch(stopLoading());
          const people = response.data.people.map((person) => person);
          setData(people);
        })
        .catch((err) => {
          if (err.response) {
            dispatch(createError(err.response.data.message));
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
        {userId ? <PeopleControl onCreate={getPeople} token={token} /> : null}
        {data.length <= 0 || data[0] === null ? (
          <h1> no people</h1>
        ) : (
          <div>
            {data.map((person) => {
              if (person) {
                return (
                  <PersonElement
                    key={person._id}
                    id={person._id}
                    name={person.name}
                    rooms={person.rooms}
                    onDelete={PersonDeleteHandler}
                  />
                );
              }
            })}
          </div>
        )}
      </div>
    );
  }
  return null;
};

export default Rooms;
