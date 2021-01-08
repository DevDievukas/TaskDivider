import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import ErrorModal from '../shared/UIElements/ErrorModal';
import InputSelector from '../shared/FormElements/InputSelector';

import { useForm } from '../shared/hooks/form-hook';
import { AuthContext } from '../shared/Context/auth-context';
import { useLoadingHook } from '../shared/hooks/loading-hook';

import styles from './AssignRoom.module.css';

const AssignRoom = (props) => {
  const { assignedRooms, onAsign, close } = props;
  const { token } = useContext(AuthContext);
  const [rooms, setRooms] = useState();
  const houseId = useParams().houseId;

  useEffect(() => {
    getRooms();
  }, []);

  const { error, setError, clearError } = useLoadingHook();
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
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/room/allByHouse/${houseId}`)
        .then((response) => {
          let rooms = response.data.rooms.map((room) => room);
          assignedRooms.forEach((assignedRoom) => {
            rooms = rooms.filter((room) => room._id !== assignedRoom._id);
          });
          setRooms(rooms);
        })
        .catch((err) => {
          if (err.response) {
            setError(err.response.data.message);
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
            setError(err.response.data.message);
          }
        });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.assignForm}>
      <ErrorModal error={error} onClear={clearError} />
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
            <button type="Submit">ADD</button>
          </div>
        </form>
      ) : null}
    </div>
  );
};

export default AssignRoom;
