import React, { useEffect, useState } from 'react';

import RequestItem from './RequestItem';

import styles from './SharedItems.module.css';

const ItemsList = (props) => {
  const { data, deleteRequest, userId } = props;
  const [dataTable, setDataTable] = useState();
  useEffect(() => {
    if (data) {
      if (data.length > 0) {
        setDataTable(
          data.map((request) => {
            if (request.author) {
              return (
                <RequestItem
                  date={request.date}
                  name={request.author}
                  request={request.body}
                  key={request._id}
                  id={request._id}
                  deleteRequest={deleteRequest}
                  userId={userId}
                />
              );
            }
          })
        );
      } else {
        setDataTable(
          <div className={styles.tableDiv}>
            <h3>NO REQUESTS ACTIVE</h3>
            <img
              src="https://res.cloudinary.com/dgegci4ii/image/upload/v1612861627/Empty_State_wcxslo.png"
              alt="Nothing found"
            />
          </div>
        );
      }
    }
  }, [data]);

  return <div>{dataTable}</div>;
};

export default ItemsList;
