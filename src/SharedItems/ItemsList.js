import React, { useEffect, useState } from 'react';

import RequestItem from './RequestItem';

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
                  delete={deleteRequest}
                  userId={userId}
                />
              );
            }
          })
        );
      } else {
        setDataTable(<h1>NO REQUESTS ACTIVE</h1>);
      }
    }
  }, [data]);

  return <div>{dataTable}</div>;
};

export default ItemsList;
