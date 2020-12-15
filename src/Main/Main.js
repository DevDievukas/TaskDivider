import React from 'react';
import { useHistory } from 'react-router';

import Input from '../shared/FormElements/Input';
import Button from '../shared/FormElements/Button';
import { useForm } from '../shared/hooks/form-hook';
import HouseCard from '../shared/UIElements/HouseCard';

import pic from '../assets/house.svg';

import styles from './Main.module.css';

const Main = () => {
  const [formState, inputHandler, setFormData] = useForm(
    {
      houseName: {
        value: '',
        isValid: false,
      },
    },
    false
  );
  const history = useHistory();

  const redirect = () => {
    history.push('/auth');
  };

  return (
    <React.Fragment>
      <h1 className={styles.mainHeader}>App name</h1>
      <HouseCard pic={pic} houseName="Demo house" />
      <div className={styles.outerSearchDiv}>
        <h4>Find House</h4>
        <form className={styles.demoHouseCard}>
          <Input
            element="input"
            id="houseName"
            type="input"
            validators={[]}
            onInput={inputHandler}
          />
          <Button>find</Button>
        </form>
      </div>
      <div className={styles.signupDiv}>
        <p>Want to create house?</p>
        <p className={styles.signupText} onClick={redirect}>
          {' '}
          signup/login
        </p>
      </div>
    </React.Fragment>
  );
};

export default Main;
