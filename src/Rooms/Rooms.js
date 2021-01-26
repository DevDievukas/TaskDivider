import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Spinner from '../shared/Spinner/Spinner';
import ErrorModal from '../shared/UIElements/ErrorModal';
import RoomsControl from './RoomsControl';

import { AuthContext } from '../shared/Context/auth-context';
import { useLoadingHook } from '../shared/hooks/loading-hook';

import styles from './Rooms.module.css';
import RoomElement from './RoomElement';

import ImageUpload from './ImgUpload';

const Rooms = () => {
  const houseId = useParams().houseId;
  const { userId } = useContext(AuthContext);
  const [data, setData] = useState(null);

  const {
    error,
    setError,
    clearError,
    isLoading,
    setIsLoading,
  } = useLoadingHook();

  useEffect(() => {
    getRooms();
  }, []);

  const getRooms = () => {
    setIsLoading(true);
    if (houseId) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/room/allByHouse/${houseId}`)
        .then((response) => {
          setIsLoading(false);
          const rooms = response.data.rooms.map((room) => room);
          setData(rooms);
        })
        .catch((err) => {
          setIsLoading(false);
          if (err.response) {
            setError(err.response.data.message);
          }
        });
    } else {
      axios
        .get('https://tvarkymas-4237a.firebaseio.com/Swalmen/rooms.json')
        .then((response) => {
          setIsLoading(false);
          const rooms = response.data.map((room) => room);
          setData(rooms);
        })
        .catch((err) => {
          setIsLoading(false);
          if (err.response) {
            setError(err.response.data.message);
          }
        });
    }
  };

  const roomDeleteHandler = (deletedRoomId) => {
    const filteredData = data.filter((room) => room._id !== deletedRoomId);
    setData(filteredData);
  };

  if (data) {
    return (
      <div className={styles.mainDiv}>
        <ImageUpload />
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && <Spinner />}
        {userId ? <RoomsControl onCreate={getRooms} /> : null}
        {data.length <= 0 ? (
          <h1> no rooms</h1>
        ) : (
          <ul className={styles.groupList}>
            {data.map((room) => {
              return (
                <RoomElement
                  key={room._id}
                  id={room._id}
                  roomName={room.roomName}
                  images={room.images}
                  people={room.cleaners}
                  onDelete={roomDeleteHandler}
                />
              );
            })}
          </ul>
        )}
      </div>
    );
  }
  return <Spinner />;
};

export default Rooms;
