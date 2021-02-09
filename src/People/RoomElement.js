import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import Modal from '../shared/UIElements/Modal';
import { Trash } from 'phosphor-react';

import styles from './RoomElement.module.css';
import { createError } from '../Store/actions/Loading';

const RoomElement = (props) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { onRemove, roomName, id, personId, token } = props;

  const removeRoom = (event) => {
    event.preventDefault();

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/person/removeRoom/${personId}`,
        {
          roomId: id,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        onRemove(id);
      })
      .catch((err) => {
        if (err.response) {
          dispatch(createError(err.response.data.message));
        }
      });
  };

  const closeRemoveRoomModal = () => {
    setShowModal(false);
  };

  const openRemoveRoomModal = () => {
    setShowModal(true);
  };

  return (
    <React.Fragment>
      <Modal
        show={showModal}
        onCancel={closeRemoveRoomModal}
        header="Are you sure you want to remove room?"
        onSubmit={removeRoom}
      >
        <div className={styles.roomDiv}>
          <button type="button" onClick={closeRemoveRoomModal}>
            CANCEL
          </button>
          <button type="submit">REMOVE</button>
        </div>
      </Modal>
      <div className={styles.roomDiv}>
        <h2>{roomName}</h2>
        <button onClick={openRemoveRoomModal} className={styles.removeBtn}>
          <Trash size={40} />
        </button>
      </div>
    </React.Fragment>
  );
};

export default RoomElement;
