import React from 'react';

const Task = (props) => {
  return (<div className="card" style={{width: '18rem'}}>
  <img src={props.img} class="card-img-top" alt="..." />
  <div class="card-body">
    <h5 class="card-title">{props.title}</h5>
    <p class="card-text">{props.description}</p>
    <a href="#" class="btn btn-primary">Complete</a>
  </div>
</div>)
}

export default Task;