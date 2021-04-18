import styled from 'styled-components'

export const Main = styled.div`
width: 80%;
margin: auto;
margin-top: 1.2em;
`

export const Inner = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
margin: auto;
border-bottom: 1px solid rgb(201, 201, 201);
`

export const HouseName = styled.h2`
text-align: center;
margin-bottom: 1.2em;
`

export const Card = styled.div`
border: 1px solid rgb(201, 201, 201);
box-shadow: 1px 1px 1px 1px rgb(231, 231, 231);
width: 90%;
margin: auto;
padding: 5px;
`

export const Controller = styled.p`
text-align: center;
border-bottom: 1px solid rgb(201, 201, 201);
font-weight: bolder;
  &:hover{
    cursor: pointer;
  }
`