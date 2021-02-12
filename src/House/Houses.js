import React, { useState } from 'react';
import Input from '../shared/FormElements/Input';
import Button from '../shared/FormElements/Button';
import { useForm } from '../shared/hooks/form-hook';
import { useLoadData } from '../shared/hooks/loadData-hook';

import HouseCard from './HouseCard';
import pic from '../assets/house.svg';
import styles from './Houses.module.css';
import { useSelector } from 'react-redux';

const Houses = () => {
  const { token, userId } = useSelector((state) => ({ ...state.auth }));
  const [houseCreation, setHouseCreation] = useState(false);
  const { data, dataLoaded, deleteData, postData } = useLoadData(
    `${process.env.REACT_APP_BACKEND_URL}/house/user/${userId}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  let houses;
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

  if (dataLoaded) {
    if (data) {
      houses = data.map((house) => {
        return (
          <HouseCard
            houseName={house.houseName}
            pic={pic}
            key={house._id}
            houseId={house._id}
            token={token}
            deleteHouse={deleteData}
          />
        );
      });
    } else {
      houses = <h2>There are no houses. Would you like to create one?</h2>;
    }
  }

  const createHouseHandler = (event) => {
    event.preventDefault();
    const createdHouse = {
      houseName: formState.inputs.houseName.value,
      password: formState.inputs.password.value,
      // frequency: formState.inputs.frequency.value,
    };
    postData(
      `${process.env.REACT_APP_BACKEND_URL}/house/`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
      createdHouse
    );
    setHouseCreation(false);
  };

  return (
    <div className={styles.housesDiv}>
      {houses}
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
