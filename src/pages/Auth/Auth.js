import React, { useEffect, useState, useSelector } from 'react';
import firebase from 'firebase';
import { useHistory } from 'react-router';

import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import SignIn from './SignIn';
import Register from './Register';

import './Auth.css';

function Login(props) {
  const [signIn, setSignIn] = useState(true);
  

  let history = useHistory();

  const redirect = () => {
    history.push('/');
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        props.onAuth(user.displayName, user.photoURL);
        console.log('[login] - redirect');
        redirect();
      }
    });

  }, []);

  const switchRegisterHandler = () => {
    setSignIn(false);
  };

  const switchSignInHandler = () => {
    setSignIn(true);
  };


  const formElement = signIn === true ? <SignIn onAuth={props.onAuth} redirect={redirect}/> : <Register />;

  return (
    <main className="auth-main">
      <div className="title-text">
        <h2>Task Distributor</h2>
        <h4>App slogan here</h4>
      </div>
      <div className="auth-box__div">
        <svg
          viewBox="0 0 16 16"
          className="bi bi-person-circle"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
          <path fillRule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          <path
            fillRule="evenodd"
            d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
          />
        </svg>
        <div className="switch-auth__div">
          <h2 onClick={switchSignInHandler}>Sign In</h2>
          <h2 onClick={switchRegisterHandler}>Register</h2>
        </div>
          {formElement}
      </div>
      <p className="copyright-disclaimer">©All rights reserved Boyka studios</p>
    </main>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, photo) => dispatch(actionCreators.auth(username, photo)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
