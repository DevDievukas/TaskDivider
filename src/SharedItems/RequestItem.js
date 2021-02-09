import React from 'react';

import styles from './RequestItem.module.css';

const RequestItem = (props) => {
  const { date, name, request, id, userId } = props;

  const parsedDate = date.substr(5, 5);

  return (
    <div className={styles.requestDiv}>
      <div className={styles.requestInner__div}>
        <p className={styles.date}> {parsedDate}</p>
        <p className={styles.name}>{name}</p>
      </div>
      <div className={styles.descDiv}>
        <p>{request}</p>
        {userId ? <button onClick={() => props.delete(id)}>x</button> : null}
      </div>
    </div>
  );
};

export default RequestItem;
