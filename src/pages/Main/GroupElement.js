import React, { useEffect, useState } from 'react';

import axios from 'axios';

import ExpandedElement from './ExpandedElement';
import './GroupElement.css';

const GroupElement = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [roomData, setRoomData] = useState();

  useEffect(() => {
    const roomIdArr = [];
    const roomDataArr = [];
    if (props.person.rooms) {
      for (let [key, value] of Object.entries(props.person.rooms)) {
        roomIdArr.push(value);
      }
      roomIdArr.forEach((element) => {
        axios
          .get(
            `https://tvarkymas-4237a.firebaseio.com/Swalmen/rooms/${element.room}.json`
          )
          .then((response) => {
            const tempObj = {
              images: response.data.images,
              name: response.data.name,
            };
            roomDataArr.push(tempObj);
          })
          .catch((err) => {
            console.log('[main][fail]' + err);
          });
      });
      setRoomData(roomDataArr);
    }
  }, []);

  const setExpandedHandler = () => {
    setExpanded(!expanded);
  };

  if (!expanded) {
    return (
      <button
        className="group-element-btn"
        onClick={setExpandedHandler}
        // onClick={conso}
        group={props.person.name}
      >
        {props.person.name}
      </button>
    );
  } else {
    return (
      <div onClick={setExpandedHandler}>
        <ExpandedElement person={props.person.name} rooms={roomData} />
      </div>
    );
  }
};
export default GroupElement;
