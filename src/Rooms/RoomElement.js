import React, { useState } from 'react';

import Card from 'react-bootstrap/Card';
import ExpandedRoom from './ExpandedRoom';

import styles from './RoomElement.module.css';

const RoomElement = (props) => {
  const { userId, onDelete, room } = props;
  const [expanded, setExpanded] = useState(false);
  let imgSrc =
    'https://image.freepik.com/free-vector/lovely-living-room-interior_23-2147517931.jpg';

  if (room.images.length > 0) {
    imgSrc = room.images[0].url;
  }

  const setExpandedHandler = () => {
    setExpanded(!expanded);
  };

  if (!expanded) {
    return (
      <Card className={styles.roomElement} onClick={setExpandedHandler}>
        <Card.Img variant="top" src={imgSrc} className={styles.roomImage} />
        <h5 className={styles.roomTitle}>{room.roomName}</h5>
      </Card>
    );
  } else {
    return (
      <div>
        <ExpandedRoom
          room={room}
          close={setExpandedHandler}
          onDelete={onDelete}
          userId={userId}
        />
      </div>
    );
  }
};

export default RoomElement;
