import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { useLoadingHook } from '../shared/hooks/loading-hook';
import { AuthContext } from '../shared/Context/auth-context';

import GroupElement from './GroupElement';
import Spinner from '../shared/Spinner/Spinner';
import ErrorModal from '../shared/UIElements/ErrorModal';
import Modal from '../shared/UIElements/Modal';
import Button from '../shared/FormElements/Button';

import styles from './Schedule.module.css';

const Schedule = () => {
  const [data, setData] = useState(null);
  const [message, setMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { token, userId } = useContext(AuthContext);
  const houseId = useParams().houseId;
  const {
    error,
    setError,
    clearError,
    isLoading,
    setIsLoading,
  } = useLoadingHook();
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
    if (houseId) {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/room/generateSchedule/${houseId}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          closeGenerateModal();
        })
        .then(() => getGroups())
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data);
            setError(err.response.data.message);
          }
        });
    }
  };

  const getGroups = () => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/room/Schedule/${houseId}`)
      .then((response) => {
        setIsLoading(false);
        if (response.data.message) {
          setMessage(response.data.message);
        }
        setData(response.data.schedule);
      })
      .catch((err) => {
        setIsLoading(false);

        if (err.response) {
          setError(err.response.data.message);
        }
      });
  };

  return (
    <div className={styles.scheduleDiv}>
      <ErrorModal error={error} onClear={clearError} />{' '}
      <Modal
        show={showModal}
        onCancel={closeGenerateModal}
        header="GENERATE SCHEDULE?"
        onSubmit={generateSchedule}
      >
        {isLoading && <Spinner asOverlay />}
        <Button type="button" onClick={closeGenerateModal}>
          CANCEL
        </Button>
        <Button type="Submit">GENERATE</Button>
      </Modal>
      {isLoading && <Spinner />}
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
