import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SharedItemsForm from './SharedItemsForm';
import ItemsList from './ItemsList';

import styles from './SharedItems.module.css';

const SharedItems = (props) => {
  const houseParam = useParams().houseId;
  const { token } = useSelector((state) => state);
  const [data, setData] = useState();

  const getData = () => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/request/allByHouseId/${houseParam}`
      )
      .then((response) => {
        setData(response.data.requests);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteRequest = (requestId) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/request/${requestId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData((prevData) => prevData.filter((req) => req._id === requestId));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className={styles.formDiv}>
        <SharedItemsForm />
      </div>
      <div>
        <ItemsList data={data} deleteRequest={deleteRequest} />
      </div>
    </div>
  );
};

export default SharedItems;
