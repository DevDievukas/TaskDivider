import React, { useEffect, useState } from 'react';

import axios from 'axios';

import styles from './RoomElement.module.css';

import Card from 'react-bootstrap/Card';
import ExpandedRoom from './ExpandedRoom';

const RoomElement = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [roomData, setRoomData] = useState();

  useEffect(() => {
    const peopleArr = [];
    const peopleNames = [];
    if (props.people) {
      for (let [key, value] of Object.entries(props.people)) {
        peopleArr.push(value);
      }
      peopleArr.forEach((element) => {
        axios
          .get(
            `https://tvarkymas-4237a.firebaseio.com/Swalmen/Complete/${element.id}.json`
          )
          .then((response) => {
            const personObj = {
              name: response.data.name,
              validity: element.valid,
            };
            peopleNames.push(personObj);
          })
          .catch((err) => {
            console.log('[main][fail]' + err);
          });
      });
      setRoomData(peopleNames);
    }
  }, []);

  const setExpandedHandler = () => {
    setExpanded(!expanded);
  };

  if (!expanded) {
    return (
      <Card className={styles.roomElement} onClick={setExpandedHandler}>
        <Card.Img
          variant="top"
          src={props.images[0]}
          className={styles.roomImage}
        />
        <h5 className={styles.roomTitle}>{props.id}</h5>
      </Card>
    );
  } else {
    return (
      <div onClick={setExpandedHandler}>
        <ExpandedRoom room={props.id} img={props.images} people={roomData} />
      </div>
    );
  }
};

export default RoomElement;
