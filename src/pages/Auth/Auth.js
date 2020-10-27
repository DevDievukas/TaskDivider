import React, { useEffect, useState, useContext } from 'react';
import firebase from 'firebase';
import { useHistory } from 'react-router';

import SignIn from './SignIn';
import Register from './Register';
import { AuthContext } from '../../shared/Context/auth-context';

import './Auth.css';

function Login(props) {
  const auth = useContext(AuthContext);
  const [signIn, setSignIn] = useState(true);

  let history = useHistory();

  const redirect = () => {
    history.push('/main');
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
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

  const signInSubmitHandler = (event) => {
    event.preventDefault();
    auth.login();
  };

  const formElement =
    signIn === true ? (
      <SignIn onAuth={signInSubmitHandler} redirect={redirect} />
    ) : (
      <Register />
    );

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

export default Login;
