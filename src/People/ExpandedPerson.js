import React, { useRef, useEffect, useContext, useState } from 'react';
import axios from 'axios';

import ErrorModal from '../shared/UIElements/ErrorModal';
import Button from '../shared/FormElements/Button';
import AssignRoom from './AssignRoom';
import RoomElement from './RoomElement';
import Modal from '../shared/UIElements/Modal';

import img from '../assets/DefaultProfile.png';
import { AuthContext } from '../shared/Context/auth-context';
import { useLoadingHook } from '../shared/hooks/loading-hook';

import styles from './ExpandedPerson.module.css';

const ExpandedPerson = (props) => {
  const { userId, token } = useContext(AuthContext);
  const [assignRoom, setAssignRoom] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState();

  const { error, setError, clearError } = useLoadingHook();
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
      .get(`${process.env.REACT_APP_BACKEND_URL}/room/person/${props.id}`)
      .then((response) => {
        const rooms = response.data.rooms.map((person) => person);
        setData(rooms);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message);
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
        .delete(`${process.env.REACT_APP_BACKEND_URL}/person/${props.id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          props.onDelete(props.id);
        });
    } catch (err) {
      if (err.response) {
        setError(error.response.data.message);
      }
    }
  };

  const roomRemoveHandler = (removedRoomId) => {
    const filteredData = data.filter((room) => room._id !== removedRoomId);
    setData(filteredData);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
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
        <div ref={roomFocus} className={styles.roomCard} onClick={props.close}>
          <img src={img} alt="profile" className={styles.profilePic} />
          <h2 className={styles.roomTitle}>{props.name}</h2>
        </div>
        {data ? (
          <ul className={styles.roomsList}>
            {data.map((room) => {
              return (
                <RoomElement
                  valid={room}
                  personId={props.id}
                  roomName={room.roomName}
                  key={room._id}
                  id={room._id}
                  onRemove={roomRemoveHandler}
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
                id={props.id}
              />
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default ExpandedPerson;
