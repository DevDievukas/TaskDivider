import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

import RequestItem from './RequestItem';

const ItemsList = () => {
  const houseParam = useParams().houseId;
  const [requestData, setRequestData] = useState('');
  const [rerender, setRerender] = useState(false);
  const getData = () => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/request/allByHouseId/${houseParam}`
      )
      .then((response) => {
        setRequestData(response.data.requests);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, [rerender]);
  let dataTable;
  if (requestData.length > 0) {
    dataTable = requestData.map((request) => {
      if (request.author) {
        return (
          <RequestItem
            date={request.date}
            name={request.author}
            request={request.body}
            key={request._id}
            id={request._id}
          />
        );
      }
    });
  }

  return <div>{dataTable}</div>;
};

export default ItemsList;
