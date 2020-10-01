import React, { useEffect } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useHistory } from 'react-router';

import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

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
    <div style={{ marginTop: '65px' }}>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, photo) => dispatch(actionCreators.auth(username, photo)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
