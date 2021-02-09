import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import RoomsControl from './RoomsControl';

import styles from './Rooms.module.css';
import RoomElement from './RoomElement';

import ImageUpload from './ImgUpload';
import {
  createError,
  startLoading,
  stopLoading,
} from '../Store/actions/Loading';

const Rooms = () => {
  const houseParam = useParams().houseId;
  const dispatch = useDispatch();
  const { userId, houseId, token } = useSelector((state) => ({
    ...state.auth,
  }));
  const [data, setData] = useState(null);

  useEffect(() => {
    getRooms();
  }, []);

  const getRooms = () => {
    const id = houseId || houseParam;
    dispatch(startLoading());
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/room/allByHouse/${id}`)
      .then((response) => {
        dispatch(stopLoading());
        const rooms = response.data.rooms.map((room) => room);
        setData(rooms);
      })
      .catch((err) => {
        if (err.response) {
          dispatch(createError(err.response.data.message));
        }
      });
  };

  const roomDeleteHandler = (deletedRoomId) => {
    const filteredData = data.filter((room) => room._id !== deletedRoomId);
    setData(filteredData);
  };

  if (data) {
    return (
      <div className={styles.mainDiv}>
        {/* <ImageUpload /> */}
        {userId ? <RoomsControl onCreate={getRooms} token={token} /> : null}
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
                  userId={userId}
                  token={token}
                />
              );
            })}
          </ul>
        )}
      </div>
    );
  }
  return null;
};

export default Rooms;
