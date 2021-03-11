import React  from 'react';

import styles from './PersonName.module.css';

const PersonName = ( props ) => {
  const { valid, name } = props;

  if ( valid ) {
    return <p className={`${styles.valid} ${styles.both}`}>{name}</p>;
  } else {
    return <p className={`${styles.notValid} ${styles.both}`}>{name}</p>;
  }
};

export default PersonName;
