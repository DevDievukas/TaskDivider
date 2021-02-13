import React from 'react';
import Button from '../shared/FormElements/Button';
import { useHistory } from 'react-router-dom';

import styles from './HouseCard.module.css';

const HouseCard = (props) => {
  const { pic, houseName, houseId, deleteHouse, token } = props;
  const history = useHistory();

  const getHouse = () => {
    history.push(`/${houseId}/announcements`);
  };

  const text = '>>>>>';
  return (
    <div className={styles.HouseCard}>
      <img src={pic} width="100px" alt="house" />
      <h4>{houseName}</h4>
      <Button onClick={getHouse}>{text}</Button>
      <Button
        onClick={() =>
          deleteHouse(
            `${process.env.REACT_APP_BACKEND_URL}/house/`,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            },
            houseId
          )
        }
        danger
      >
        X
      </Button>
    </div>
  );
};

export default HouseCard;
