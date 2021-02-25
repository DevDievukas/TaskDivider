import React from 'react';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';

type Props = {
  houseName: string,
  houseId: string
}

const Card = styled.div`
margin: auto;
  display: flex;
  width: 80%;
  border: 0.6px solid rgba(199, 199, 199, 0.473);
  background-color: #fafafa;
  border-radius: 5px;

  &:active{
    background-color: whitesmoke;
  }
`

const House = styled.h4`
font-family: 'Times New Roman', Times, serif;
font-size: 28px;
font-weight: bold;
  margin: auto;
  padding: .1em;
`



const HouseCard = (props: Props) => {
  const {  houseName, houseId } = props;
  const history = useHistory();

  const getHouse = () => {
    history.push(`/${houseId}/announcements`);
  };

  return (
    <Card onClick={getHouse}>
      <House >{houseName}</House>
    </Card>
  );
};

export default HouseCard;
