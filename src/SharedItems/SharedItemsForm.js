import React, { useState } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Form from './Form';
import Button from '../shared/FormElements/Button';
import Modal from '../shared/UIElements/Modal';

import styles from './SharedItems.module.css';

const SharedItemsForm = (props) => {
  const houseParam = useParams().houseId;
  const { token, userId, houseId } = useSelector((state) => state);
  const [showModal, setShowModal] = useState(false);

  const clearRequestsSubmitHandler = (event) => {
    event.preventDefault();
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
        console.table(res.data);
        setShowModal(false);
      })
      .catch((err) => {
        console.log('[App] ' + err);
      });
  };

  const closeClearRequestsModal = () => {
    setShowModal(false);
  };

  const openClearRequestsModal = () => {
    setShowModal(true);
  };

  return (
    <div className={styles.formDiv}>
      <Modal
        show={showModal}
        onCancel={closeClearRequestsModal}
        header="DELETE ALL REQUESTS?"
        onSubmit={clearRequestsSubmitHandler}
      >
        <Button onClick={closeClearRequestsModal} type="button">
          CANCEL
        </Button>
        <Button type="submit">CLEAR</Button>
      </Modal>
      <Form houseId={houseId} />
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
  );
};

export default SharedItemsForm;
