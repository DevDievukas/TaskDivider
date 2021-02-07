import React from 'react';
import Button from '../FormElements/Button';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { useSelector } from 'react-redux';

import styles from './HouseCard.module.css';

const HouseCard = (props) => {
  const { pic, houseName, houseId } = props;
  const { token } = useSelector((state) => state);
  const history = useHistory();

  const getHouse = () => {
    history.push(`/${houseId}/Rooms`);
  };

  const deleteHouse = () => {
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/house/${houseId}`,

        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.table(res.data);
      })
      .catch((err) => {
        console.log('[App] ' + err);
      });
  };

  const text = '>>>>>';
  return (
    <div className={styles.HouseCard}>
      <img src={pic} width="100px" alt="house" />
      <h4>{houseName}</h4>
      <Button onClick={getHouse}>{text}</Button>
      <Button onClick={deleteHouse} danger>
        X
      </Button>
    </div>
  );
};

export default HouseCard;
