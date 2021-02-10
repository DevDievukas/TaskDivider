import React, { useState } from 'react';

import styles from './PersonElement.module.css';

import ExpandedPerson from './ExpandedPerson';

const PersonElement = (props) => {
  const [expanded, setExpanded] = useState(false);
  const { userId, token, name, rooms, id, onDelete } = props;

  const setExpandedHandler = () => {
    setExpanded(!expanded);
  };

  if (!expanded) {
    return (
      <button className={styles.personCard} onClick={setExpandedHandler}>
        <h4 className={styles.title}>{name}</h4>
      </button>
    );
  } else {
    return (
      <ExpandedPerson
        name={name}
        rooms={rooms}
        id={id}
        close={setExpandedHandler}
        onDelete={onDelete}
        userId={userId}
        token={token}
      />
    );
  }
};

export default PersonElement;
