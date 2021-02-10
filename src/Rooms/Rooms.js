import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLoadData } from '../shared/hooks/loadData-hook';

import RoomsControl from './RoomsControl';

import styles from './Rooms.module.css';
import RoomElement from './RoomElement';
import EmptyData from '../shared/UIElements/EmptyData/EmptyData.tsx';

import ImageUpload from './ImgUpload';

const Rooms = () => {
  const houseParam = useParams().houseId;
  const { userId, houseId, token } = useSelector((state) => ({
    ...state.auth,
  }));
  const { data, setData } = useLoadData(
    `${process.env.REACT_APP_BACKEND_URL}/room/allByHouse/${
      houseId || houseParam
    }`
  );
  let rooms;

  const roomDeleteHandler = (deletedRoomId) => {
    const filteredData = data.filter((room) => room._id !== deletedRoomId);
    setData(filteredData);
  };

  if (data) {
    rooms = (
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
    );
  } else {
    rooms = <EmptyData header="NO ROOMS FOUND" />;
  }
  return (
    <div className={styles.mainDiv}>
      {/* <ImageUpload /> */}
      {userId ? <RoomsControl token={token} /> : null}
      {rooms}
    </div>
  );
};

export default Rooms;
