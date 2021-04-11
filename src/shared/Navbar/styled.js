import styled from 'styled-components'

import { Link } from 'react-router-dom';

export const Section = styled.div`
  justify-content: space-around;
  display: flex;
  text-align: center;
  border-bottom: 1px solid black;
`

export const Navigation = styled.nav`
  display: block;
  margin-bottom: 8px;
`

export const LinkItem = styled(Link)`
  color: ${(props) => props.theme.btnDanger};
  padding: 0 10px 0 10px;
  padding-bottom: 5px;
  font-weight: bold;
  font-size: 24px;
  text-decoration: none;

  &:active{
    border-bottom: 1px solid rgb(230, 230, 230);
    padding-bottom: 0;
    color: ${(props) => props.theme.background};
  }

  &:hover{
    color: ${(props) => props.theme.background};
    border: none;
    text-decoration: none;
  }
`;
