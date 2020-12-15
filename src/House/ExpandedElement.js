import React, { useEffect, useState } from 'react';

import axios from 'axios';
import useAxios from 'axios-hooks';
import Spinner from '../shared/Spinner/Spinner';
import ErrorModal from '../shared/UIElements/ErrorModal';

import Input from '../shared/FormElements/Input';
import Button from '../shared/FormElements/Button';
import { useForm } from '../shared/hooks/form-hook';

const ExpandedElement = (props) => {
  const { id, type } = props;
  const [errorText, setErrorText] = useState();
  const [people, setPeople] = useState();
  const [{ data, loading, error }, refetch] = useAxios(
    `http://localhost:5000/api/${type}/allByHouse/${id}`
  );

  const [formState, inputHandler] = useForm(
    {
      name: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const handleRefetch = async () => {
    try {
      await refetch();
    } catch (err) {
      setErrorText(err.message);
    }
  };

  useEffect(() => {
    handleRefetch();
  }, []);

  useEffect(() => {
    if (data) {
      // console.log(data.people);
      if (data.people.length >= 0) {
        setPeople(
          data.people.map((person) => {
            console.log(person);
            return <h4 key={person._id}>{person.name}</h4>;
          })
        );
      }
    }
  }, [data]);

  const createPersonHandler = (event) => {
    try {
      axios
        .post('http://localhost:5000/api/person/', {
          name: formState.inputs.name.value,
          house: id,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          setErrorText(error.message);
        });
    } catch (err) {
      setErrorText(err.message);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={errorText} onClear={() => setErrorText(null)} />
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <h1 onClick={props.onClick}>Expanded</h1>
          <div>{people}</div>
          <form onSubmit={createPersonHandler}>
            <Input
              element="input"
              id="name"
              type="input"
              validators={[]}
              onInput={inputHandler}
            />
            <Button type="Submit">Create</Button>
          </form>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ExpandedElement;
