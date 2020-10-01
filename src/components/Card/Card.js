import React from 'react';
import img from '../../assets/profile-icon.svg';

import './Card.css';

const Card = (props) => {
  return (
    <div className="card-div">
      <p className="text-btn">Delete</p>
      <img src={props.img} className="card-img" />
      <div className="team-div">
        <h4>{props.name}</h4>
        {/* <p>{props.description}</p> */}
        <p>
          lorem epsum besdad asdf idasmp sadf fads sdafh imk;ads ;lmsad oopmwerw
          l;s,fd safdk kljfasn; jna;lksdnfn unwelsd jnfka ln knsdf nlkdsfsafdsda
          asdfadf asdfadsf asdfads
        </p>
      </div>
    </div>
  );
};

export default Card;
