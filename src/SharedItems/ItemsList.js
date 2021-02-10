import React, { useEffect, useState } from 'react';

import RequestItem from './RequestItem';

import styles from './SharedItems.module.css';

const ItemsList = (props) => {
  const { data, deleteRequest, userId } = props;

  let table;
  if (data.length > 0) {
    console.log('here');
    table = data.map((request) => {
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
    });
  } else {
    table = null;
  }

  return table;
};

export default ItemsList;
