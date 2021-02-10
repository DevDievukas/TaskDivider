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
  const { data, setData } = useLoadData(
    `${process.env.REACT_APP_BACKEND_URL}/person/allByHouse/${houseParam}`
  );
  let people;

  const PersonDeleteHandler = (deletedPersonId) => {
    const filteredData = data.filter(
      (person) => person._id !== deletedPersonId
    );
    setData(filteredData);
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
      {userId ? <PeopleControl onCreate={'getPeople'} token={token} /> : null}{' '}
      {people}
    </div>
  );
};

export default Rooms;
