import React from 'react';

import styles from './PersonName.module.css';

const PersonName = (props) => {
  if (props.valid) {
    return <p className={`${styles.valid} ${styles.both}`}>{props.name}</p>;
  } else {
    return <p className={`${styles.notValid} ${styles.both}`}>{props.name}</p>;
  }
};

export default PersonName;
