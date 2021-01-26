import React, { useEffect, useState, useContext } from 'react';
import Input from '../shared/FormElements/Input';
import Button from '../shared/FormElements/Button';
import InputSelector from '../shared/FormElements/InputSelector';
import axios from 'axios';

import { useForm } from '../shared/hooks/form-hook';
import { useLoadingHook } from '../shared/hooks/loading-hook';
import { AuthContext } from '../shared/Context/auth-context';

import HouseCard from '../shared/UIElements/HouseCard';
import pic from '../assets/house.svg';
import Spinner from '../shared/Spinner/Spinner';
import ErrorModal from '../shared/UIElements/ErrorModal';
import styles from './Houses.module.css';

const Houses = () => {
  const { userId, token } = useContext(AuthContext);
  const [houseCreation, setHouseCreation] = useState(false);
  const [data, setData] = useState();
  const [cards, setCards] = useState();
  const {
    error,
    setError,
    clearError,
    isLoading,
    setIsLoading,
  } = useLoadingHook();
  const [formState, inputHandler] = useForm(
    {
      houseName: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
      // frequency: {
      //   value: '',
      //   isValid: false,
      // },
    },
    false
  );

  const noHouse = (
    <div>
      <h2>There are no houes. Would you like to create one?</h2>
      <Button onClick={() => setHouseCreation(true)}>Create</Button>
    </div>
  );

  useEffect(() => {
    getHouses();
  }, [userId]);

  useEffect(() => {
    if (data) {
      if (data.houses.length >= 0) {
        if (data.houses[0] === undefined) {
          return setCards(noHouse);
        }
        setCards(
          data.houses.map((house) => {
            if (house) {
              return (
                <HouseCard
                  houseName={house.houseName}
                  pic={pic}
                  key={house._id}
                  houseId={house._id}
                />
              );
            }
          })
        );
      }
    }
  }, [data]);

  const getHouses = () => {
    setIsLoading(true);
    if (userId) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/house/user/${userId}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setIsLoading(false);
          setData(response.data);
        })
        .catch((err) => {
          setIsLoading(false);
          if (err.response) {
            setError(err.response.data.message);
          }
        });
    }
  };

  const createHouseHandler = (event) => {
    try {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/house/`,
          {
            houseName: formState.inputs.houseName.value,
            password: formState.inputs.password.value,
            // frequency: formState.inputs.frequency.value,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          if (error.response) {
            setError(error.response.data.message);
          }
        });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.housesDiv}>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading ? <Spinner /> : cards}
      {houseCreation ? (
        <form onSubmit={createHouseHandler}>
          <Input
            element="input"
            id="houseName"
            type="input"
            placeholder="House name"
            validators={[]}
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            placeholder="password"
            validators={[]}
            onInput={inputHandler}
          />
          {/* <InputSelector
            id="frequency"
            label="Please select cleaning frequency: "
            onInput={inputHandler}
            validators={[]}
            initialValue="1"
          >
            <option value="1">Every week</option>
            <option value="2">Every 2 weeks</option>
            <option value="3">Every 3 weeks</option>
            <option value="4">Monthly</option>
          </InputSelector> */}
          <Button onClick={() => setHouseCreation(false)}>Cancel</Button>
          <Button type="Submit">Create</Button>
        </form>
      ) : (
        <button
          onClick={() => setHouseCreation(true)}
          className={styles.createHouseBtn}
        >
          Create House
        </button>
      )}
    </div>
  );
};

export default Houses;
