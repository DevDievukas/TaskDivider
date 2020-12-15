import React from 'react';

import './Modal.css';

const Modal = (props) => {
  return (
    <div className="modal-div">
      <h3>Prašymas sėkmingai pateiktas</h3>
      <button onClick={props.close} className="modal-button">
        x
      </button>
    </div>
  );
};

export default Modal;
