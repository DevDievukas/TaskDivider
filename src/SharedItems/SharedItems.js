import React, { useState } from 'react';
import axios from 'axios';

import useFetchData from '../shared/hooks/fetchData-hook';
import usePostData from '../shared/hooks/postData-hook';
import useDeleteData from '../shared/hooks/deleteData-hook';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

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
  const loadedData = useFetchData(
    `${process.env.REACT_APP_BACKEND_URL}/request/allByHouseId/${
      houseParam || houseId
    }`
  );
  const { post } = usePostData();
  const { deleteData } = useDeleteData();
  const [showModalClear, setShowModalClear] = useState(false);

  const closeClearRequestsModal = () => {
    setShowModalClear(false);
  };

  const openClearRequestsModal = () => {
    setShowModalClear(true);
  };

  const deleteRequestHandler = (requestId) => {
    const deleteFilter = () => {
      loadedData.setData((prevData) =>
        prevData.filter((element) => element._id !== requestId)
      );
    };
    deleteData(
      `${process.env.REACT_APP_BACKEND_URL}/request/`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
      requestId,
      deleteFilter
    );
  };

  const postRequestHandler = (request) => {
    const addFilter = (res) => {
      if (loadedData.data) {
        loadedData.setData((prevData) => [...prevData, res]);
      } else {
        loadedData.setData([res]);
      }
    };
    post(
      `${process.env.REACT_APP_BACKEND_URL}/request`,
      null,
      request,
      addFilter
    );

    // postData(`${process.env.REACT_APP_BACKEND_URL}/request`, null, request);
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
        loadedData.setData(null);
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
        <Button onClick={closeClearRequestsModal} type="button" cancel>
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
      {loadedData.data.length > 0 && loadedData.dataLoaded ? (
        <ItemsList
          data={loadedData.data}
          deleteRequest={deleteRequestHandler}
          userId={userId}
        />
      ) : (
        loadedData.dataLoaded && <EmptyData header="NO REQUEST ACTIVE" />
      )}
    </div>
  );
};

export default SharedItems;
