import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from '../shared/FormElements/Button';
import Modal from '../shared/UIElements/Modal';

import Form from './Form';
import ItemsList from './ItemsList';

import styles from './SharedItems.module.css';

const SharedItems = (props) => {
  const houseParam = useParams().houseId;
  const { token, userId, houseId } = useSelector((state) => state);
  const [data, setData] = useState();
  const [showModalClear, setShowModalClear] = useState(false);

  const closeClearRequestsModal = () => {
    setShowModalClear(false);
  };

  const openClearRequestsModal = () => {
    setShowModalClear(true);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/request/allByHouseId/${
          houseParam || houseId
        }`
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
        setData((prevData) => prevData.filter((req) => req._id !== requestId));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postRequest = (request) => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/request`, request)
      .then((res) => {
        setData((prevData) => [...prevData, res.data.request]);
      })
      .catch((err) => {
        console.log('[App] ' + err);
      });
  };

  const clearRequestsSubmitHandler = () => {
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/request/all/${houseParam}`,

        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setData(null);
      })
      .catch((err) => {
        console.log('[App] ' + err);
      });
  };

  return (
    <div className={styles.requestDiv}>
      <Modal
        show={showModalClear}
        onCancel={closeClearRequestsModal}
        header="DELETE ALL REQUESTS?"
        onSubmit={clearRequestsSubmitHandler}
      >
        <Button onClick={closeClearRequestsModal} type="button">
          CANCEL
        </Button>
        <Button type="submit">CLEAR</Button>
      </Modal>
      <div className={styles.formDiv}>
        <Form
          houseId={houseId}
          houseParam={houseParam}
          postRequest={postRequest}
        />
        {userId ? (
          <Button
            danger
            onClick={openClearRequestsModal}
            className={styles.clearBtn}
          >
            Delete Requests
          </Button>
        ) : null}
      </div>
      <div>
        <ItemsList data={data} deleteRequest={deleteRequest} userId={userId} />
      </div>
    </div>
  );
};

export default SharedItems;
