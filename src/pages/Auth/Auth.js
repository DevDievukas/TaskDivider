import React, { useEffect } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useHistory } from 'react-router';

import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

import './Auth.css';

function Login(props) {
  let history = useHistory();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        props.onAuth(user.displayName, user.photoURL);
        console.log('[login] - redirect');
        history.push('/');
      }
    });
  }, []);

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  return (
    <main className="auth-main">
      <div className="auth-box__div">
        <svg
          width="10em"
          height="10em"
          viewBox="0 0 16 16"
          class="bi bi-person-circle"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
          <path fill-rule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          <path
            fill-rule="evenodd"
            d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
          />
        </svg>
        <div className="switch-auth__div">
          <h2>Sign In</h2>
          <h2>Register</h2>
        </div>
        <form className="form">
          <div className="form-group">
            <input
              placeholder="Email adress"
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="form-group">
            <input
              placeholder="password"
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" for="exampleCheck1">
              Keep signed in
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Sign In!
          </button>
        </form>
        <p className="forgot-password">forgot password?</p>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    </main>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, photo) => dispatch(actionCreators.auth(username, photo)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
