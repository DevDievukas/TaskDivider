import React, { useRef, useEffect, useState } from 'react';
import { useLoadData } from '../shared/hooks/loadData-hook';

import Button from '../shared/FormElements/Button';
import AssignRoom from './AssignRoom';
import RoomElement from './RoomElement';
import Modal from '../shared/UIElements/Modal';

import img from '../assets/DefaultProfile.png';

import styles from './ExpandedPerson.module.css';

const ExpandedPerson = (props) => {
  const { userId, token, id, name, close, onDelete } = props;
  const [assignRoom, setAssignRoom] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { data, setData } = useLoadData(
    `${process.env.REACT_APP_BACKEND_URL}/room/person/${id}`
  );

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
    onDelete(id);
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
