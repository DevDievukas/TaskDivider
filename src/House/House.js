import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import useAxios from 'axios-hooks';
import Spinner from '../shared/Spinner/Spinner';
import ErrorModal from '../shared/UIElements/ErrorModal';
import Element from './Element';

import styles from './House.module.css';

const House = (props) => {
  const houseId = useParams().houseId;
  const [errorText, setErrorText] = useState();
  const [{ data, loading }, refetch] = useAxios(
    `http://localhost:5000/api/house/${houseId}`
  );

  const arrow = '>>>';

  const handleRefech = async () => {
    try {
      await refetch();
    } catch (err) {
      setErrorText(err.message);
    }
  };

  useEffect(() => {
    handleRefech();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const LoadedLayout = () => {
    if (data.house) {
      return (
        <React.Fragment>
          <h1 className={styles.houseTitle}>{data.house.houseName}</h1>
          <Element title="People" id={data.house._id} type="person" />
          <Element title="Rooms" />
          <Element title="Requests" />
        </React.Fragment>
      );
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={errorText} onClear={() => setErrorText(null)} />
      {loading ? <Spinner /> : <LoadedLayout />}
    </React.Fragment>
  );
};

export default House;
