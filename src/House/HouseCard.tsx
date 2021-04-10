import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import React from 'react';
import styled from 'styled-components';

import { setHouse } from './actions'


type Props = {
  houseName: string,
  houseId: string
}

const Card = styled.div`
  margin: auto;
  display: flex;
  width: 80%;
  margin-bottom: .6em;
  border-bottom: .5px solid gray;

  &:active > * {
    font-size: 32px;
}
`

const House = styled.h4`
font-family: 'Times New Roman', Times, serif;
font-size: 28px;
font-weight: bold;
  margin: auto;
  padding: .1em;
`

const HouseCard = (props: Props): JSX.Element => {
  const history = useHistory()
  const dispatch = useDispatch()

  const { houseName, houseId } = props;

  const getHouse = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/house/${houseId}`)
      .then(res => {
        console.log(res.data.houseName)
        dispatch(setHouse(res.data))
        history.push(`/${houseId}/announcements`);
      }).catch(error => {
        console.log(error)
      })
  };

  return (
    <Card onClick={getHouse}>
      <House >{houseName}</House>
    </Card>
  )
}

export default HouseCard;
