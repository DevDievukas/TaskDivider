import styled from 'styled-components'

export const Card = styled.div`
margin: auto;
margin-bottom: 10px;
width: 40%;
height: 150px;
border: solid 1px ${(props) => props.theme.border};
border-radius: 15px;
box-shadow: 1px 1px 1px ${(props) => props.theme.border};

&:active {
  background-color: ${(props) => props.theme.active};
}
`

export const HouseImage = styled.img`
padding-top: 15px;
padding-bottom: 15px;
width: 50%;
`

export const House = styled.h4`
font-family: 'Times New Roman', Times, serif;
font-weight: bold;
margin: auto;
font-size: 20px;
`

export const HouseListContainer = styled.div `
text-align: center;
margin: auto;
padding-right: 5px;
padding-left: 5px;
width: 80%;
display: flex;
flex-wrap: wrap;
justify-content: space-around;
`