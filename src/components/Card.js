import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';

function Card(props) {
  const [room, setRoom] = useState('');
  const [counter, setCounter] = useState(0);
  const [length, setLength] = useState('');

  useEffect(() => {
    axios
      .get(`https://tvarkymas-4237a.firebaseio.com/Assigned.json`, {
        headers: { Accept: 'application/json' },
      })
      .then((res) => {
        const id = Object.keys(res.data);
        setLength(Object.keys(res.data[id]).length);
        setRoom(res.data[id][counter]);
      })
      .catch((err) => {
        console.log('[card] ' + err);
      });
  }, [counter]);

  const forward = () => {
    if (counter >= length - 1) {
      setCounter(0);
    } else {
      setCounter(counter + 1);
    }
  };

  const back = () => {
    if (counter <= 0) {
      setCounter(length - 1);
    } else setCounter(counter - 1);
  };

  return (
    <div
      className="card"
      style={{
        display: 'block',
        height: '80vh',
        marginTop: '5.5vh',
        padding: '0',
      }}
    >
      <img
        style={{ height: '100%', width: '100%' }}
        src={room.picture}
        className="card-img-top"
        alt="..."
      ></img>
      <div className="card-body">
        <h5 className="card-title">{room.person}</h5>
        <p className="card-text">{room.room}</p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <button onClick={back} className="btn btn-primary">
            Atgal
          </button>
          <button onClick={forward} className="btn btn-primary">
            Sekantis
          </button>
          {/* <a onClick={props.onAuth} className="btn btn-primary">
            Sekantis
          </a> */}
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: () => dispatch(actionCreators.auth()),
  };
};

export default connect(null, mapDispatchToProps)(Card);
