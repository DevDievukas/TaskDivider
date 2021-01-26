import React, { useState, useEffect } from 'react';

import axios from 'axios';

import Card from 'react-bootstrap/Card';
import ExpandedRoom from './ExpandedRoom';

import styles from './RoomElement.module.css';
import { EnvelopeSimple } from 'phosphor-react';

const RoomElement = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [roomData, setRoomData] = useState();
  let imgSrc =
    'https://image.freepik.com/free-vector/lovely-living-room-interior_23-2147517931.jpg';

  useEffect(() => {
    if (props.images[0]) {
      imgSrc = props.images[0];
    }

    const peopleArr = props.people.map((person) => person);
    const peopleNames = [];
    peopleArr.forEach(async (element) => {
      await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/person/${element.cleaner}`)
        .then((response) => {
          const personObj = {
            name: response.data.person.name,
            validity: element.validity,
            id: response.data.person._id,
          };
          peopleNames.push(personObj);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    setRoomData(peopleNames);
  }, [props.people]);

  const setExpandedHandler = () => {
    setExpanded(!expanded);
  };

  if (!expanded) {
    return (
      <Card className={styles.roomElement} onClick={setExpandedHandler}>
        <Card.Img variant="top" src={imgSrc} className={styles.roomImage} />
        <h5 className={styles.roomTitle}>{props.roomName}</h5>
      </Card>
    );
  } else {
    return (
      <div>
        <ExpandedRoom
          room={props.roomName}
          img={props.images}
          people={roomData}
          id={props.id}
          close={setExpandedHandler}
          onDelete={props.onDelete}
        />
      </div>
    );
  }
};

export default RoomElement;
