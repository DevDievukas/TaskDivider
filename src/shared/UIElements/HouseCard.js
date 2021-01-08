import React from 'react';
import Button from '../FormElements/Button';
import { useHistory } from 'react-router-dom';

import styles from './HouseCard.module.css';

const HouseCard = (props) => {
  const { pic, houseName, houseId } = props;
  const history = useHistory();

  const getHouse = () => {
    history.push(`/${houseId}/Rooms`);
  };

  const text = '>>>>>';
  return (
    <div className={styles.HouseCard}>
      <img src={pic} width="100px" alt="house" />
      <h4>{houseName}</h4>
      <Button onClick={getHouse}>{text}</Button>
    </div>
  );
};

export default HouseCard;
