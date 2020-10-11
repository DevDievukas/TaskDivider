import React from 'react';

import { Link } from 'react-router-dom';

import Button from '../../shared/Input/Button';

import './Starting.css';

const Starting = () =>  {
  return (
    <React.Fragment>
    <div className="starting-div">
      <h1>Task Distributor</h1>
      <h5>No bias distribution of tasks</h5>
      <Link  to='/auth'>
        <Button className="starting-btn">Get Started!</Button>
      </Link>
    </div>
    
    <div className="video-div">
      <svg viewBox="0 0 16 16" className="bi bi-play-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
      </svg>
    </div>
    </React.Fragment>
  )
}

export default Starting;