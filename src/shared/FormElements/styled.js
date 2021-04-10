import styled from 'styled-components'

export const AddButton = styled.button`
  background-color: ${(props) => props.theme.background};
  position: fixed;
  bottom: 8%;
  right: 8%;
  border-radius: 50%;
  border: none;
  width: 120px;
  height: 120px;
  padding: 0;
  text-align: center;
  outline: none;

  
&:active {
  background-color: ${(props) => props.theme.btnActive};
  box-shadow: 3px 3px 2px ${(props) => props.theme.border}
}
`

export const ButtonInner = styled.p`
margin: auto;
font-size: 100px;
color: ${(props) => props.theme.text}
`