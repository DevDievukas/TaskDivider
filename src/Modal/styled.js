import styled from 'styled-components'

export const Message = styled.h2`
  border-bottom: 1px solid #21E51D;
`

export const Modal = styled.div`
z-index: 150;
position: fixed;
top: 5em;
left: 10%;
width: 80%;
background: white;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
border-radius: 8px;
text-align: center;
max-height: 80vh;
overflow: auto;
border: 1px solid #198911;

${({ error }) => error && `
    ${Message}{
      color: #BA1818;
      border-bottom: 1px solid #BA1818;
    }
    ${Modal}{
      border: 1px solid #BA1818;
    }
    ${okButton}{
      border-color: #BA1818;
      color: #BA1818;s
    }
  `}

`

export const okButton = styled.button`
  width: 2.5em;
  height: 2.5em;
  border-radius: 50%;
  border-color: #198911;
  background-color: transparent;
  margin-bottom: 5px;
  color: #198911;
  box-shadow: none;
`