import React from 'react';

import './Task.css';

const Task = (props) => {
  return (
    <div className="card" >
      <img src={props.img} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.description}</p>
        <a href="/mytasks" className="btn">Complete</a>
      </div>
    </div>
)
}

export default Task;