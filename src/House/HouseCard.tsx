import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import React from 'react';

import { Card, House, HouseImage } from './styled'
import { setHouseHandler } from './thunks';


type Props = {
  houseName: string,
  houseId: string
}
const HouseCard = (props: Props): JSX.Element => {
  const history = useHistory()
  const dispatch = useDispatch()

  const { houseName, houseId } = props;

  const getHouse = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/house/${houseId}`)
      .then(res => {
        dispatch(setHouseHandler(res.data))
        history.push(`/${houseId}/announcements`);
      }).catch(error => {
        console.log(error)
      })
  };

  return (
    <Card onClick={getHouse}>
      <HouseImage src='https://www.freepnglogos.com/uploads/house-png/house-png-file-nuvola-filesystems-folder-home-svg-wikimedia-commons-30.png' alt='house' />
      <House >{houseName}</House>
    </Card>
  )
}

export default HouseCard;
