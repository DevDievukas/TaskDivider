import React from 'react';

import styles from './RequestItem.module.css';

type Props ={
  date: string,
  name: string,
  id: string,
  userId: string,
  request: string,
  deleteRequest(id: string): VoidFunction
}

const RequestItem = (props: Props) => {
  const { date, name, request, id, userId, deleteRequest } = props;

  const parsedDate = date.substr(5, 5);

  return (
    <div className={styles.requestDiv}>
      <div className={styles.requestInner__div}>
        <p className={styles.date}> {parsedDate}</p>
        <p className={styles.name}>{name}</p>
      </div>
      <div className={styles.descDiv}>
        <p>{request}</p>
        {userId ? <button onClick={() => deleteRequest(id)}>x</button> : null}
      </div>
    </div>
  );
};

export default RequestItem;
