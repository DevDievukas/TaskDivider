import React, { useState } from 'react';

import styles from './PersonElement.module.css';

import ExpandedPerson from './ExpandedPerson';

const PersonElement = (props) => {
  const [expanded, setExpanded] = useState(false);
  const { userId, token } = props;

  const setExpandedHandler = () => {
    setExpanded(!expanded);
  };

  if (!expanded) {
    return (
      <button className={styles.personCard} onClick={setExpandedHandler}>
        <h4 className={styles.title}>{props.name}</h4>
      </button>
    );
  } else {
    return (
      <ExpandedPerson
        name={props.name}
        rooms={props.rooms}
        id={props.id}
        close={setExpandedHandler}
        onDelete={props.onDelete}
        userId={userId}
        token={token}
      />
    );
  }
};

export default PersonElement;
