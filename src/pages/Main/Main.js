import React, { useEffect, useState } from 'react';
import axios from 'axios';

import GroupElement from './GroupElement';

import './Main.css';

const Main = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = () => {
    axios
      .get('https://tvarkymas-4237a.firebaseio.com/Swalmen/Complete.json')
      .then((response) => {
        const tempArray = [];
        for (let [key, value] of Object.entries(response.data)) {
          tempArray.push(value);
        }
        setData(tempArray);
      })
      .catch((err) => {
        console.log('[main][fail]' + err);
      });
  };

  const iterate = () => {
    data.map((stuff) => {
      console.log(stuff);
    });
  };

  if (data) {
    return (
      <React.Fragment>
        <ul className="groups-list">
          {data.map((person) => {
            return (
              <GroupElement
                key={person.name}
                id={person.name}
                person={person}
              />
            );
          })}
        </ul>
      </React.Fragment>
    );
  }
  return (
    <div className="lds-circle">
      <div></div>
    </div>
  );
};

export default Main;
