import React       from 'react';

import RequestItem from './RequestItem';

const ItemsList = (props) => {
  const { data, deleteRequest, userId } = props;

  let table;
  if (data.length > 0) {
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
