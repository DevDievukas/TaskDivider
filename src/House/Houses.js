import React, { useEffect, useState } from 'react';
import Input from '../shared/FormElements/Input';
import Button from '../shared/FormElements/Button';
import axios from 'axios';

import { useForm } from '../shared/hooks/form-hook';
import { useLoadData } from '../shared/hooks/loadData-hook';

import HouseCard from '../shared/UIElements/HouseCard';
import pic from '../assets/house.svg';
import styles from './Houses.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearError,
  createError,
  startLoading,
  stopLoading,
} from '../Store/actions/Loading';

const Houses = () => {
  const { token, userId } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const [houseCreation, setHouseCreation] = useState(false);
  const { data } = useLoadData(
    `${process.env.REACT_APP_BACKEND_URL}/house/user/${userId}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  const [cards, setCards] = useState();
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

  const createHouseHandler = (event) => {
    dispatch(startLoading());
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
          dispatch(stopLoading());
        })
        .catch((error) => {
          if (error.response) {
            dispatch(clearError(error.response.data.message));
          }
        });
    } catch (err) {
      dispatch(clearError(err.message));
    }
  };

  return (
    <div className={styles.housesDiv}>
      {cards}
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
