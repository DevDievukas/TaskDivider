import React, { useRef, useEffect, useContext, useState } from 'react';

import axios from 'axios';

import Spinner from '../shared/Spinner/Spinner';
import ErrorModal from '../shared/UIElements/ErrorModal';
import Modal from '../shared/UIElements/Modal';

import Button from '../shared/FormElements/Button';

import { AuthContext } from '../shared/Context/auth-context';
import { useLoadingHook } from '../shared/hooks/loading-hook';

import styles from './ExpandedRoom.module.css';
import PersonName from './PersonName';

import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
const ExpandedRoom = (props) => {
  const { userId, token } = useContext(AuthContext);
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
        <Carousel controls={false} interval={3000} className={styles.caro}>
          {/* {props.img.map((img) => {
            return (
              <Carousel.Item key={img} className={styles.caroItem}>
                <img
                  className="d-block w-100"
                  src={`${process.env.REACT_APP_ASSET_URL}/${img}`}
                  alt={img}
                />
              </Carousel.Item>
            );
          })} */}
          <img
            className="d-block w-100"
            src={`${process.env.REACT_APP_ASSET_URL}/${props.img}`}
            alt={'img'}
          />
        </Carousel>
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
