import React, { useRef, useEffect, useState } from 'react';
import { useLoadData } from '../shared/hooks/loadData-hook';
import Modal from '../shared/UIElements/Modal';

import Button from '../shared/FormElements/Button';

import styles from './ExpandedRoom.module.css';
import PersonName from './PersonName';

import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';

const ExpandedRoom = (props) => {
  const { room, close, onDelete, userId } = props;
  const { data } = useLoadData(
    `${process.env.REACT_APP_BACKEND_URL}/person/allByRoom/${room._id}`
  );
  const [showModal, setShowModal] = useState(false);
  let people;
  const roomFocus = useRef(null);

  useEffect(() => {
    window.scrollTo({
      top: roomFocus.current.offsetTop - 50,
      behavior: 'smooth',
    });
  }, []);

  const deleteRoomHandler = (event) => {
    event.preventDefault();
    onDelete(room._id);
    setShowModal(false);
  };

  const showDeleteRoomModal = () => {
    setShowModal(true);
  };

  const closeDeleteRoomModal = () => {
    setShowModal(false);
  };

  if (data) {
    console.log(data);
    people = data.map((person) => {
      return (
        <PersonName
          valid={person.validity}
          name={person.name}
          key={person.id}
        />
      );
    });
  }

  return (
    <React.Fragment>
      <Modal
        show={showModal}
        onCancel={closeDeleteRoomModal}
        header="Are you sure you want to delete room"
        onSubmit={deleteRoomHandler}
      >
        <Button type="button" onClick={closeDeleteRoomModal}>
          CANCEL
        </Button>
        <Button type="submit" onClick={deleteRoomHandler}>
          DELETE
        </Button>
      </Modal>
      <Card ref={roomFocus} className={styles.roomCard} onClick={close}>
        {room.images.length > 0 ? (
          <Carousel controls={false} interval={3000} className={styles.caro}>
            {room.images.map((img) => {
              return (
                <Carousel.Item key={img} className={styles.caroItem}>
                  <img className="d-block w-100" src={img} alt={img} />
                </Carousel.Item>
              );
            })}
          </Carousel>
        ) : (
          <img
            className="d-block w-100"
            src={
              'https://image.freepik.com/free-vector/lovely-living-room-interior_23-2147517931.jpg'
            }
            alt={'room image'}
          />
        )}
        {people}
        <h2 className={styles.roomTitle}>{room.roomName}</h2>
      </Card>
      {userId && <Button onClick={showDeleteRoomModal}>DELETE ROOM</Button>}
    </React.Fragment>
  );
};

export default ExpandedRoom;
