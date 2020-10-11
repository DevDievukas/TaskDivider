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
    history.push('/main');
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
      <div className="auth-box__div">
        
        <div className="switch-auth__div">
          <h2 onClick={switchSignInHandler}>Sign In</h2>
          <h2 onClick={switchRegisterHandler}>Register</h2>
        </div>
          {formElement}
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
