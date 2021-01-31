import React, { useRef, useEffect, useState } from 'react';

import axios from 'axios';

import Spinner from '../shared/Spinner/Spinner';
import ErrorModal from '../shared/UIElements/ErrorModal';
import Modal from '../shared/UIElements/Modal';

import Button from '../shared/FormElements/Button';

import { useLoadingHook } from '../shared/hooks/loading-hook';

import styles from './ExpandedRoom.module.css';
import PersonName from './PersonName';

import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
const ExpandedRoom = (props) => {
  const { userId, token } = useSelector((state) => state);
  const [showModal, setShowModal] = useState(false);

  const {
    error,
    setError,
    clearError,
    isLoading,
    setIsLoading,
  } = useLoadingHook();
  const roomFocus = useRef(null);

  useEffect(() => {
    window.scrollTo({
      top: roomFocus.current.offsetTop - 50,
      behavior: 'smooth',
    });
  }, []);

  const deleteRoomHandler = async () => {
    setIsLoading(true);
    try {
      axios
        .delete(`${process.env.REACT_APP_BACKEND_URL}/room/${props.id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setIsLoading(false);
          props.onDelete(props.id);
        });
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        setError(error.response.data.message);
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
      <ErrorModal error={error} onClear={clearError} />
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
      <Card ref={roomFocus} className={styles.roomCard} onClick={props.close}>
        {isLoading && <Spinner />}
        {props.img.length > 0 ? (
          <Carousel controls={false} interval={3000} className={styles.caro}>
            {props.img.map((img) => {
              return (
                <Carousel.Item key={img} className={styles.caroItem}>
                  <img className="d-block w-100" src={img} alt={img} />
                </Carousel.Item>
              );
            })}
            {/* <img className="d-block w-100" src={props.img} alt={'img'} /> */}
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

        <h2 className={styles.roomTitle}>{props.room}</h2>
        {props.people.map((person) => {
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
