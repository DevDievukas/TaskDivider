import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import InputSelector from '../shared/FormElements/InputSelector';

import { useForm } from '../shared/hooks/form-hook';

import styles from './AssignRoom.module.css';
import { createError } from '../Store/actions/Loading';

const AssignRoom = (props) => {
  const { close, token, rooms, id, assign } = props;
  const dispatch = useDispatch();
  let assignForm;

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
        `${process.env.REACT_APP_BACKEND_URL}/person/assignRoom/${id}`,
        { roomId: formState.inputs.room.value, personId: id },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        assign(res.data);
      })
      .catch((err) => {
        if (err.response) {
          dispatch(createError(err.message));
        }
      });
  };

  if (rooms.length > 0) {
    assignForm = (
      <form onSubmit={submitAssign}>
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
        )
        <div className={styles.btnDiv}>
          <button onClick={() => close(false)} type="button">
            CANCEL
          </button>
          <button type="Submit">ADD</button>
        </div>
      </form>
    );
  } else {
    assignForm = null;
  }

  return <div className={styles.assignForm}>{assignForm}</div>;
};

export default AssignRoom;
