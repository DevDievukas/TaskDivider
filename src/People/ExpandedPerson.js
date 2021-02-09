import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';

import { useDispatch } from 'react-redux';

import ErrorModal from '../shared/UIElements/ErrorModal';
import Button from '../shared/FormElements/Button';
import AssignRoom from './AssignRoom';
import RoomElement from './RoomElement';
import Modal from '../shared/UIElements/Modal';

import img from '../assets/DefaultProfile.png';

import styles from './ExpandedPerson.module.css';
import { createError } from '../Store/actions/Loading';

const ExpandedPerson = (props) => {
  const { userId, token, id, name, close, onDelete } = props;
  const dispatch = useDispatch();
  const [assignRoom, setAssignRoom] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState();

  const roomFocus = useRef(null);

  useEffect(() => {
    getRooms();
    window.scrollTo({
      top: roomFocus.current.offsetTop - 50,
      behavior: 'smooth',
    });
  }, []);

  const getRooms = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/room/person/${id}`)
      .then((response) => {
        const rooms = response.data.rooms.map((person) => person);
        setData(rooms);
      })
      .catch((err) => {
        if (err.response) {
          dispatch(createError(err.response.data.message));
        }
      });
  };

  const showAssignRoom = () => {
    setAssignRoom(true);
  };

  const closeAssignRoom = () => {
    setAssignRoom(false);
  };

  const openDeletePersonModal = () => {
    setShowModal(true);
  };

  const closeDeletePersonModal = () => {
    setShowModal(false);
  };

  const deletePersonHandler = async (event) => {
    event.preventDefault();
    try {
      axios
        .delete(`${process.env.REACT_APP_BACKEND_URL}/person/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          onDelete(id);
        });
    } catch (error) {
      if (error.response) {
        dispatch(createError(error.response.data.message));
      }
    }
  };

  const roomRemoveHandler = (removedRoomId) => {
    const filteredData = data.filter((room) => room._id !== removedRoomId);
    setData(filteredData);
  };

  return (
    <React.Fragment>
      <Modal
        show={showModal}
        onCancel={closeDeletePersonModal}
        header="Delete person"
        onSubmit={deletePersonHandler}
      >
        <Button onClick={closeDeletePersonModal} type="button">
          CANCEL
        </Button>
        <Button type="submit">DELETE</Button>
      </Modal>
      <div className={styles.expandedCard}>
        <div ref={roomFocus} className={styles.roomCard} onClick={close}>
          <img src={img} alt="profile" className={styles.profilePic} />
          <h2 className={styles.roomTitle}>{name}</h2>
        </div>
        {data ? (
          <ul className={styles.roomsList}>
            {data.map((room) => {
              return (
                <RoomElement
                  valid={room}
                  personId={id}
                  roomName={room.roomName}
                  key={room._id}
                  id={room._id}
                  onRemove={roomRemoveHandler}
                  token={token}
                />
              );
            })}
          </ul>
        ) : null}
        {userId && (
          <div className={styles.controlBtnDiv}>
            {!assignRoom ? (
              <React.Fragment>
                <Button onClick={showAssignRoom}>ASSIGN ROOM</Button>
                <Button onClick={openDeletePersonModal}>DELETE PERSON</Button>
              </React.Fragment>
            ) : (
              <AssignRoom
                close={closeAssignRoom}
                onAsign={getRooms}
                assignedRooms={data}
                id={id}
                token={token}
              />
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default ExpandedPerson;
