import React, { useEffect, useState } from 'react';

import axios from 'axios';

import RequestItem from './RequestItem';

const ItemsList = () => {
  const [requestData, setRequestData] = useState('');
  const [rerender, setRerender] = useState(false);
  const getData = () => {
    axios
      .get(`https://tvarkymas-4237a.firebaseio.com/Requests.json`)
      .then((response) => {
        setRequestData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteRequest = (props) => {
    axios
      .delete(`https://tvarkymas-4237a.firebaseio.com/Requests/${props}.json`)
      .then((response) => {
        setRerender(!rerender);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, [rerender]);
  let dataTable;
  if (requestData) {
    let requests = [];
    requests = Object.values(requestData);
    const requestIds = Object.keys(requestData);
    dataTable = <h2>Data is loading</h2>;

    let i = -1;
    dataTable = requests.map((item) => {
      i++;
      return (
        <RequestItem
          date={item[2]}
          name={item[0]}
          request={item[1]}
          key={requestIds[i]}
          id={requestIds[i]}
          delete={deleteRequest}
        />
      );
    });
  }

  return <div>{dataTable}</div>;
};

export default ItemsList;
