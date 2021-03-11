import { useHistory } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';


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



const HouseCard = (props: Props) => {
  const history = useHistory();

  const { houseName, houseId } = props;

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
