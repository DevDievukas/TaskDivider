import styled from 'styled-components'

export const Modal = styled.div`
z-index: 100;
position: fixed;
top: 5em;
left: 10%;
width: 80%;
background: white;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
border-radius: 8px;
text-align: center;
max-height: 80vh;
overflow: none;
`
export const Header = styled.header`
background-color: white;
width: 100%;
position: absolute;
top: 1%;
text-align: center;
border-bottom: .5px solid gray;
padding: 5px;
font-size: 26px;
font-weight: bold;
`

export const Body = styled.div`
  display: block;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
  padding-top: 10px;
  overflow: auto;
  margin-top: 45px;
  max-height: 60vh;
`