import React, { useEffect, useState } from 'react';

import './GroupElement.css';

const GroupElement = (props) => {
  const [expanded, setExpanded] = useState(false);

  let text = <p>Šią savaite ilsitės</p>;
  let roomsText = '';

  const setExpandedHandler = () => {
    setExpanded(!expanded);
  };

  if (props.person.rooms) {
    // props.person.rooms.map((room) => {
    //   roomsText += room.name;
    // });

    for (let [key, value] of Object.entries(props.person.rooms)) {
      roomsText += ' ' + value.room;
    }

    text = <h4>Jūs šią savaite tvarkote:</h4>;
    // text = (
    //   <div>
    //     <h4>Jūs šią savaite tvarkote:</h4>
    //     {roomsText}
    //   </div>
    // );
  }

  if (!expanded) {
    return (
      <button
        className="group-element-btn"
        onClick={setExpandedHandler}
        group={props.person.name}
      >
        {props.person.name}
      </button>
    );
  } else {
    return (
      <div onClick={setExpandedHandler}>
        <h1>{props.person.name}</h1>
        <div>
          {text}
          {roomsText}
        </div>
      </div>
    );
  }
};

export default GroupElement;
