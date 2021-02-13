import React, { useEffect, useState } from 'react';
import { Form, Field, Formik } from 'formik';

import { useLoadData } from '../shared/hooks/loadData-hook';

import FormModal from '../shared/UIElements/FormModal/FormModal';
import Button from '../shared/FormElements/Button';
import HouseCard from './HouseCard';
import pic from '../assets/house.svg';
import styles from './Houses.module.css';
import { useSelector } from 'react-redux';

const Houses = () => {
  const { token, userId } = useSelector((state) => ({ ...state.auth }));
  const [houseCreation, setHouseCreation] = useState(false);
  const { data, dataLoaded, deleteData, postData, getData } = useLoadData();

  useEffect(() => {
    getData(`${process.env.REACT_APP_BACKEND_URL}/house/user/${userId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }, []);

  let houses;

  if (dataLoaded) {
    if (data.length > 0) {
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

  const createHouseHandler = (houseName, password) => {
    const createdHouse = {
      houseName,
      password,
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

  const form = (
    <Formik
      initialValues={{
        houseName: '',
        password: '',
      }}
      onSubmit={async (values) => {
        console.log(values);
        createHouseHandler(values.houseName, values.password);
      }}
    >
      {({}) => (
        <Form className={styles.form}>
          <div className={styles.wrapper}>
            <div className={styles.field}>
              <Field required id="houseName" name="houseName" type="input" />
              <label htmlFor="email">NAME OF THE HOUSE</label>
            </div>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.field}>
              <Field required id="password" name="password" type="password" />
              <label htmlFor="password">PASSWORD</label>
            </div>
          </div>
          <div className={styles.buttonsDiv}>
            <Button
              type="button"
              onClick={() => setHouseCreation(false)}
              danger
              className={styles.button}
            >
              CANCEL
            </Button>
            <Button type="submit" className={styles.button}>
              CREATE!
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );

  return (
    <div className={styles.housesDiv}>
      <FormModal
        onCancel={() => setHouseCreation(false)}
        header="CREATE HOUSE?"
        show={houseCreation}
        form={form}
      />
      {houses}

      <Button
        onClick={() => setHouseCreation(true)}
        className={styles.createHouseBtn}
        danger
      >
        CREATE HOUSE
      </Button>
    </div>
  );
};

export default Houses;
