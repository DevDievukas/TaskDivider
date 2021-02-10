import React, { useState } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLoadData } from '../shared/hooks/loadData-hook';

import Button from '../shared/FormElements/Button';
import Modal from '../shared/UIElements/Modal';

import Form from './Form';
import ItemsList from './ItemsList';

import styles from './SharedItems.module.css';
import {
  createError,
  startLoading,
  stopLoading,
} from '../Store/actions/Loading';

const SharedItems = () => {
  const houseParam = useParams().houseId;
  const { token, userId, houseId } = useSelector((state) => ({
    ...state.auth,
  }));
  const dispatch = useDispatch();
  const [showModalClear, setShowModalClear] = useState(false);
  const { data, setData } = useLoadData(
    `${process.env.REACT_APP_BACKEND_URL}/request/allByHouseId/${
      houseParam || houseId
    }`
  );

  const closeClearRequestsModal = () => {
    setShowModalClear(false);
  };

  const openClearRequestsModal = () => {
    setShowModalClear(true);
  };

  const deleteRequest = (requestId) => {
    dispatch(startLoading());
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/request/${requestId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(stopLoading());
        setData((prevData) => prevData.filter((req) => req._id !== requestId));
      })
      .catch((err) => {
        dispatch(createError(err.response.data.message));
      });
  };

  const postRequest = (request) => {
    dispatch(startLoading());
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/request`, request)
      .then((res) => {
        dispatch(stopLoading());
        console.log(res.data);
        setData((prevData) => [...prevData, res.data]);
      })
      .catch((err) => {
        dispatch(createError(err.response.data.message));
      });
  };

  const clearRequestsSubmitHandler = () => {
    dispatch(startLoading());
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
        dispatch(stopLoading());
        setData(null);
      })
      .catch((err) => {
        dispatch(createError(err.response.data.message));
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
