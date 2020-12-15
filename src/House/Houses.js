import React, { useEffect, useState, useContext } from 'react';
import Input from '../shared/FormElements/Input';
import Button from '../shared/FormElements/Button';
import axios from 'axios';
import useAxios from 'axios-hooks';

import { useForm } from '../shared/hooks/form-hook';
import HouseCard from '../shared/UIElements/HouseCard';
import pic from '../assets/house.svg';
import Spinner from '../shared/Spinner/Spinner';
import ErrorModal from '../shared/UIElements/ErrorModal';

import { AuthContext } from '../shared/Context/auth-context';

const Houses = () => {
  const { userId } = useContext(AuthContext);
  const [errorText, setErrorText] = useState();
  const [{ data, loading }, refetch] = useAxios(
    `http://localhost:5000/api/house/user/${userId}`
  );
  const [cards, setCards] = useState(<h1>No Loaded Houses</h1>);
  const [formState, inputHandler] = useForm(
    {
      houseName: {
        value: '',
        isValid: false,
      },
    },
    false
  );
  let housesArr = [];

  const handleRefech = async () => {
    try {
      await refetch();
    } catch (err) {
      setErrorText(err.message);
      console.log(err);
    }
  };
  useEffect(() => {
    handleRefech();
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data.houses);
      if (data.houses.length >= 0) {
        data.houses.forEach((house) => {
          housesArr.push(house);
        });
      }
      if (housesArr.length >= 0) {
        setCards(
          housesArr.map((house) => {
            return (
              <HouseCard
                houseName={house.houseName}
                pic={pic}
                key={house._id}
                houseId={house._id}
              />
            );
          })
        );
      }
    }
  }, [data]);

  const createHouseHandler = () => {
    try {
      axios
        .post('http://localhost:5000/api/house/', {
          creator: userId,
          houseName: formState.inputs.houseName.value,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={errorText} onClear={() => setErrorText(null)} />
      {loading ? <Spinner /> : cards}
      <form onSubmit={createHouseHandler}>
        <Input
          element="input"
          id="houseName"
          type="input"
          validators={[]}
          onInput={inputHandler}
        />
        <Button type="Submit">Create</Button>
      </form>
    </React.Fragment>
  );
};

export default Houses;
