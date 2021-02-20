import React from 'react';

import styles from './RoomElement.module.css';

const RoomElement = (props) => {
  const { roomName, unassign, roomId } = props;
  return (
    <div className={styles.roomDiv}>
      <p>{roomName}</p>
      <p onClick={() => unassign(roomId)}>X</p>
    </div>
  );
};

export default RoomElement;
