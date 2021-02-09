import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import GroupElement from './GroupElement';
import Modal from '../shared/UIElements/Modal';
import Button from '../shared/FormElements/Button';

import styles from './Schedule.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  createError,
  startLoading,
  stopLoading,
} from '../Store/actions/Loading';

const Schedule = () => {
  const [data, setData] = useState(null);
  const [message, setMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { token, userId, houseId } = useSelector((state) => ({
    ...state.auth,
  }));
  const houseParam = useParams().houseId;
  useEffect(() => {
    getGroups();
  }, []);

  const closeGenerateModal = () => {
    setShowModal(false);
  };

  const openGenerateModal = () => {
    setShowModal(true);
  };

  const generateSchedule = (event) => {
    event.preventDefault();
    if (houseParam) {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/room/generateSchedule/${houseParam}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          closeGenerateModal();
        })
        .then(() => getGroups())
        .catch((err) => {
          if (err.response) {
            dispatch(createError(err.response.data.message));
          }
        });
    }
  };

  const getGroups = () => {
    dispatch(startLoading());
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/room/Schedule/${
          houseParam || houseId
        }`
      )
      .then((response) => {
        dispatch(stopLoading());
        if (response.data.message) {
          setMessage(response.data.message);
        }
        setData(response.data.schedule);
      })
      .catch((err) => {
        if (err.response) {
          dispatch(createError(err.response.data.message));
        }
      });
  };

  return (
    <div className={styles.scheduleDiv}>
      <Modal
        show={showModal}
        onCancel={closeGenerateModal}
        header="GENERATE SCHEDULE?"
        onSubmit={generateSchedule}
      >
        <Button type="button" onClick={closeGenerateModal}>
          CANCEL
        </Button>
        <Button type="Submit">GENERATE</Button>
      </Modal>
      {userId ? (
        <button onClick={openGenerateModal} className={styles.generateBtn}>
          GENERATE SCHEDULE
        </button>
      ) : null}
      {message && <h1>{message}</h1>}
      {data ? (
        <React.Fragment>
          <h2 className={styles.date}>{data.date.split('T')[0]}</h2>
          <ul className={styles.groupList}>
            {data.list.map((person) => {
              return (
                <GroupElement
                  key={person.name}
                  id={person.name}
                  name={person.name}
                  rooms={person.rooms}
                />
              );
            })}
          </ul>
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default Schedule;
