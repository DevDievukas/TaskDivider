import React, { useState, useCallback } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLoadData } from '../shared/hooks/loadData-hook';

import Button from '../shared/FormElements/Button';
import Modal from '../shared/UIElements/Modal';

import Form from './Form';
import ItemsList from './ItemsList';
import EmptyData from '../shared/UIElements/EmptyData/EmptyData';

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
  const { data, dataLoaded, setData, postData, deleteData } = useLoadData(
    `${process.env.REACT_APP_BACKEND_URL}/request/allByHouseId/${
      houseParam || houseId
    }`
  );

  console.log('render');

  const closeClearRequestsModal = () => {
    setShowModalClear(false);
  };

  const openClearRequestsModal = () => {
    setShowModalClear(true);
  };

  const deleteRequestHandler = (requestId) => {
    deleteData(
      `${process.env.REACT_APP_BACKEND_URL}/request/`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
      requestId
    );
  };

  const postRequestHandler = (request) => {
    postData(`${process.env.REACT_APP_BACKEND_URL}/request`, null, request);
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
        setShowModalClear(false);
        dispatch(stopLoading());
        setData(null);
      })
      .catch((err) => {
        dispatch(createError(err.message));
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
          postRequest={postRequestHandler}
        />
        {userId ? (
          <Button onClick={openClearRequestsModal} className={styles.clearBtn}>
            DELETE REQUESTS
          </Button>
        ) : null}
      </div>
      {data.length > 0 && dataLoaded ? (
        <ItemsList
          data={data}
          deleteRequest={deleteRequestHandler}
          userId={userId}
        />
      ) : (
        dataLoaded && <EmptyData header="NO REQUEST ACTIVE" />
      )}
    </div>
  );
};

export default SharedItems;
