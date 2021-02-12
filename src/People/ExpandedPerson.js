import React, { useRef, useEffect, useState } from 'react';
import { useLoadData } from '../shared/hooks/loadData-hook';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Button from '../shared/FormElements/Button';
import AssignRoom from './AssignRoom';
import RoomElement from './RoomElement';
import Modal from '../shared/UIElements/Modal';

import img from '../assets/DefaultProfile.png';

import styles from './ExpandedPerson.module.css';
import {
  createError,
  startLoading,
  stopLoading,
} from '../Store/actions/Loading';

const ExpandedPerson = (props) => {
  const { userId, token, id, name, close, onDelete } = props;
  const dispatch = useDispatch();
  const [assignRoom, setAssignRoom] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const houseParam = useParams().houseId;
  const [notAssignedRooms, setNotAssignedRooms] = useState([]);
  const { data, setData } = useLoadData(
    `${process.env.REACT_APP_BACKEND_URL}/room/person/${id}`
  );

  let rooms;

  useEffect(() => {
    dispatch(startLoading());
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/room/person/unassigned/${id}/${houseParam}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(stopLoading());
        setNotAssignedRooms(res.data);
      })
      .catch((err) => {
        dispatch(createError(err.message));
      });
  }, [dispatch, houseParam, id, token]);

  const roomFocus = useRef(null);

  useEffect(() => {
    window.scrollTo({
      top: roomFocus.current.offsetTop - 50,
      behavior: 'smooth',
    });
  }, []);

  const showAssignRoom = () => {
    setAssignRoom(true);
  };

  const closeAssignRoom = (assignedData) => {
    setNotAssignedRooms(
      notAssignedRooms.filter((room) => room._id !== assignedData._id)
    );
    if (data) {
      setData((prevData) => [...prevData, assignedData]);
    } else {
      setData([assignedData]);
    }
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
    onDelete(id);
  };

  const roomRemoveHandler = (removedRoomId) => {
    setData(data.filter((room) => room._id !== removedRoomId._id));
    if (notAssignedRooms) {
      setNotAssignedRooms((prev) => [...prev, removedRoomId]);
    } else {
      setNotAssignedRooms([removedRoomId]);
    }
  };

  if (data) {
    rooms = (
      <ul className={styles.roomsList}>
        {data.map((room) => {
          return (
            <RoomElement
              room={room}
              personId={id}
              key={room._id}
              onRemove={roomRemoveHandler}
              token={token}
            />
          );
        })}
      </ul>
    );
  } else {
    rooms = null;
  }

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
        {rooms}
        {userId && (
          <div className={styles.controlBtnDiv}>
            {!assignRoom ? (
              <React.Fragment>
                {notAssignedRooms.length > 0 ? (
                  <Button onClick={showAssignRoom}>ASSIGN ROOM</Button>
                ) : null}
                <Button onClick={openDeletePersonModal}>DELETE PERSON</Button>
              </React.Fragment>
            ) : (
              <AssignRoom
                close={setAssignRoom}
                assign={closeAssignRoom}
                assignedRooms={data}
                id={id}
                token={token}
                rooms={notAssignedRooms}
              />
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default ExpandedPerson;
