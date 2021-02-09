import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import InputSelector from '../shared/FormElements/InputSelector';

import { useForm } from '../shared/hooks/form-hook';

import styles from './AssignRoom.module.css';
import {
  createError,
  startLoading,
  stopLoading,
} from '../Store/actions/Loading';

const AssignRoom = (props) => {
  const { assignedRooms, onAsign, close, token } = props;
  const dispatch = useDispatch();
  const [rooms, setRooms] = useState();
  const houseId = useParams().houseId;

  useEffect(() => {
    getRooms();
  }, []);

  const [formState, inputHandler] = useForm(
    {
      room: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const getRooms = () => {
    if (houseId) {
      dispatch(startLoading());
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/room/allByHouse/${houseId}`)
        .then((response) => {
          dispatch(stopLoading());
          let rooms = response.data.rooms.map((room) => room);
          assignedRooms.forEach((assignedRoom) => {
            rooms = rooms.filter((room) => room._id !== assignedRoom._id);
          });
          setRooms(rooms);
        })
        .catch((err) => {
          if (err.response) {
            dispatch(createError(err.response.data.message));
          }
        });
    }
  };

  const submitAssign = (event) => {
    event.preventDefault();
    try {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/person/assignRoom/${props.id}`,
          { roomId: formState.inputs.room.value, personId: props.id },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          onAsign();
          close();
        })
        .catch((err) => {
          if (err.response) {
            dispatch(createError(err.response.data.message));
          }
        });
    } catch (err) {
      dispatch(createError(err.message));
    }
  };

  return (
    <div className={styles.assignForm}>
      {rooms ? (
        <form onSubmit={submitAssign}>
          {rooms[0] ? (
            <InputSelector
              id="room"
              label="please select room"
              onInput={inputHandler}
              validators={[]}
              initialValue={rooms[0]._id}
            >
              {rooms.map((room) => {
                return (
                  <option key={room._id} value={room._id}>
                    {room.roomName}
                  </option>
                );
              })}
            </InputSelector>
          ) : (
            <h1>No rooms to assign!</h1>
          )}
          <div className={styles.btnDiv}>
            <button onClick={props.close} type="button">
              CANCEL
            </button>
            {rooms[0] ? <button type="Submit">ADD</button> : null}
          </div>
        </form>
      ) : null}
    </div>
  );
};

export default AssignRoom;
