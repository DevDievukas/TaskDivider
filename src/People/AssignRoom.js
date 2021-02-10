import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import InputSelector from '../shared/FormElements/InputSelector';

import { useLoadData } from '../shared/hooks/loadData-hook';

import { useForm } from '../shared/hooks/form-hook';

import styles from './AssignRoom.module.css';
import { createError } from '../Store/actions/Loading';

const AssignRoom = (props) => {
  const { assignedRooms, close, token } = props;
  const dispatch = useDispatch();
  const houseId = useParams().houseId;
  const { data, setData } = useLoadData(
    `${process.env.REACT_APP_BACKEND_URL}/room/allByHouse/${houseId}`
  );

  useEffect(() => {
    console.log(data);
    if (assignedRooms && data && data.length > 0) {
      const tempArr = [];
      assignedRooms.forEach((assignedRoom) => {
        data.filter((element) => element._id !== assignedRoom._id);
      });
    }
  }, [data, assignedRooms]);

  const [formState, inputHandler] = useForm(
    {
      room: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const submitAssign = (event) => {
    event.preventDefault();
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
        close();
      })
      .catch((err) => {
        if (err.response) {
          dispatch(createError(err.message));
        }
      });
  };

  return (
    <div className={styles.assignForm}>
      {data ? (
        <form onSubmit={submitAssign}>
          {data[0] ? (
            <InputSelector
              id="room"
              label="please select room"
              onInput={inputHandler}
              validators={[]}
              initialValue={data[0]._id}
            >
              {data.map((room) => {
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
            {data[0] ? <button type="Submit">ADD</button> : null}
          </div>
        </form>
      ) : null}
    </div>
  );
};

export default AssignRoom;
