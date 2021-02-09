import React, { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import Modal from '../shared/UIElements/Modal';

import Button from '../shared/FormElements/Button';

import styles from './ExpandedRoom.module.css';
import PersonName from './PersonName';

import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import {
  createError,
  startLoading,
  stopLoading,
} from '../Store/actions/Loading';

const ExpandedRoom = (props) => {
  const { id, img, room, people, close, onDelete, userId, token } = props;
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const roomFocus = useRef(null);

  useEffect(() => {
    window.scrollTo({
      top: roomFocus.current.offsetTop - 50,
      behavior: 'smooth',
    });
  }, []);

  const deleteRoomHandler = async () => {
    dispatch(startLoading());
    try {
      axios
        .delete(`${process.env.REACT_APP_BACKEND_URL}/room/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          dispatch(stopLoading());
          onDelete(id);
        });
    } catch (error) {
      if (error.response) {
        dispatch(createError(error.response.data.message));
      }
    }
  };

  const showDeleteRoomModal = () => {
    setShowModal(true);
  };

  const closeDeleteRoomModal = () => {
    setShowModal(false);
  };

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
        {img.length > 0 ? (
          <Carousel controls={false} interval={3000} className={styles.caro}>
            {img.map((img) => {
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

        <h2 className={styles.roomTitle}>{room}</h2>
        {people.map((person) => {
          return (
            <PersonName
              valid={person.validity}
              name={person.name}
              key={person.id}
            />
          );
        })}
      </Card>
      {userId && <Button onClick={showDeleteRoomModal}>DELETE ROOM</Button>}
    </React.Fragment>
  );
};

export default ExpandedRoom;
