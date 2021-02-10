import React from 'react';
import { useParams } from 'react-router-dom';
import { useLoadData } from '../shared/hooks/loadData-hook';

import PeopleControl from './PeopleControl';
import EmptyData from '../shared/UIElements/EmptyData/EmptyData.tsx';

import styles from './People.module.css';
import PersonElement from './PersonElement';
import { useSelector } from 'react-redux';

const Rooms = () => {
  const houseParam = useParams().houseId;
  const { userId, token } = useSelector((state) => ({ ...state.auth }));
  const { data, postData, deleteData } = useLoadData(
    `${process.env.REACT_APP_BACKEND_URL}/person/allByHouse/${houseParam}`
  );
  let people;

  const PersonDeleteHandler = (personId) => {
    deleteData(
      `${process.env.REACT_APP_BACKEND_URL}/person/`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
      personId
    );
  };

  const createPersonHandler = (person) => {
    postData(
      `${process.env.REACT_APP_BACKEND_URL}/person/`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
      person
    );
  };

  if (data) {
    people = (
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
                token={token}
                userId={userId}
              />
            );
          }
        })}
      </div>
    );
  } else {
    people = <EmptyData header="NO PEOPLE!" />;
  }

  return (
    <div className={styles.mainDiv}>
      {userId ? (
        <PeopleControl createPerson={createPersonHandler} token={token} />
      ) : null}
      {people}
    </div>
  );
};

export default Rooms;
