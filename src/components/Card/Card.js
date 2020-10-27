import React from 'react';

import './Card.css';

const Card = (props) => {
  let authLevel = false;
  let descriptionText = props.description;
  let descriptionBtn = <button className="description-btn">...</button>;
  if (descriptionText.length > 80) {
    descriptionText = descriptionText.slice(0, 77);
  } else {
    descriptionBtn = null;
  }

  let cardButton = <button className="card-btn">complete</button>;

  if (authLevel) {
    cardButton = <button className="card-btn">delete</button>;
  }

  const description = (
    <React.Fragment>
      {descriptionText}
      {descriptionBtn}
    </React.Fragment>
  );
  return (
    <div className="card-div">
      <img src={props.img} className="card-img" />
      <div className="team-div">
        <h4>{props.name}</h4>
        {description}
      </div>
      {cardButton}
    </div>
  );
};

export default Card;
