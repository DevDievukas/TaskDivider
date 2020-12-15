import React from 'react';

import './RequestItem.css';

const RequestItem = (props) => {
  return (
    <div className="request-div">
      <div className="request-inner__div">
        <p className="date"> {props.date}</p>
        <p className="name">{props.name}</p>
      </div>
      <div className="desc-div">
        <p>{props.request}</p>
        {/* <button onClick={() => props.delete(props.id)}>x</button> */}
      </div>
    </div>
  );
};

export default RequestItem;
