import { useState } from 'react'
import React        from 'react'

import Button       from '../shared/FormElements/Button'
import Login        from './Login'
import SignUp       from './SignUp'
import styles       from './Auth.module.css'



const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [isUserLogin, setIsUserLogin] = useState(true)
  let form

  const switchToSignUp = () => {
    setIsLoginMode(false)
  }

  const switchToLogin = () => {
    setIsLoginMode(true)
  }

  const switchToHouseLogin = () => {
    setIsUserLogin(false)
  }

  const switchToUserLogin = () => {
    setIsUserLogin(true)
  }

  if (isLoginMode) {
    form = <Login isUserLogin={isUserLogin}/>
  } else {
    form = <SignUp />
  }

  const signUp = (
    <div className={styles.signUpDiv}>
      <div className={styles.signUpTextDiv}>
        Want to manage your house?&nbsp;
        <p className={styles.signUpText} onClick={switchToSignUp}>
        Sign up instead!
        </p>
      </div>
    </div>
  )
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
              className={!isUserLogin ? styles.active : null}
            >
              House Login
            </h3>
            <h3
              onClick={switchToUserLogin}
              className={isUserLogin ? styles.active : null}
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
  )
}

export default Auth
