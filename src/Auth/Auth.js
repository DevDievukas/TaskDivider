import React, { useState } from 'react';

import LoginUser from './LoginUser';
import SignUp from './SignUp';
import LoginHouse from './LoginHouse';

import Button from '../shared/FormElements/Button';
import styles from './Auth.module.css';

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [houseLogin, setHouseLogin] = useState(true);
  let form;

  const switchToSignUp = () => {
    setIsLoginMode(false);
  };

  const switchToLogin = () => {
    setIsLoginMode(true);
  };

  const switchToHouseLogin = () => {
    setHouseLogin(true);
  };

  const switchToUserLogin = () => {
    setHouseLogin(false);
  };

  if (isLoginMode && houseLogin) {
    form = <LoginHouse />;
  } else if (isLoginMode && !houseLogin) {
    form = <LoginUser />;
  } else {
    form = <SignUp />;
  }

  const signUp = (
    <div className={styles.signUpDiv}>
      <p>Want to manage your house? </p>
      <p className={styles.signUpText} onClick={switchToSignUp}>
        Sign up instead!
      </p>
    </div>
  );
  return (
    <div className={styles.mainDiv}>
      <div className={styles.logoDiv}>
        <img
          className={styles.logo}
          src="https://res.cloudinary.com/dgegci4ii/image/upload/v1613754032/Logo1_avumoz.png"
          alt="logo"
        />
      </div>
      <div>
        {isLoginMode ? (
          <div className={styles.switchTypeDiv}>
            <h3
              onClick={switchToHouseLogin}
              className={houseLogin ? styles.active : null}
            >
              House Login
            </h3>
            <h3
              onClick={switchToUserLogin}
              className={!houseLogin ? styles.active : null}
            >
              User Login
            </h3>
          </div>
        ) : null}
        {form}
        {isLoginMode ? (
          signUp
        ) : (
          <Button onClick={switchToLogin} className={styles.button} danger>
            CANCEL
          </Button>
        )}
      </div>
    </div>
  );
};

export default Auth;
