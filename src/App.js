import React, { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Card from './components/Card';
import Login from './pages/login/Login';
import { connect } from 'react-redux';
import * as actionCreators from './store/actions/index';
import firebase from 'firebase';
import axios from 'axios';

function App(props) {
  // const userName = useSelector((state) => state.username);
  // const photoUrl = useSelector((state) => state.photo);

  const user = {
    displayName: 'Boyka',
    email: 'Boykagmailcom',
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('[App] ' + user);
      if (user) {
        props.onAuth(user.displayName, user.photoURL);
      }
    });
  }, [props]);

  function getUser() {
    axios
      .get(`https://tvarkymas-4237a.firebaseio.com/Users/${user.email}.json`)
      .then((response) => {
        if (!response.data) {
          createUser();
        } else {
          console.log('[App][success]' + response.data);
        }
      })
      .catch((err) => {
        console.log('[App][fail}' + err);
      });
  }

  function createUser() {
    axios
      .post(
        `https://tvarkymas-4237a.firebaseio.com/Users/${user.email}.json`,
        user
      )
      .then((res) => {
        console.log('[App]' + res);
      })
      .catch((err) => {
        console.log('[App] ' + err);
      });
  }

  return (
    <Router>
      <div className="container" style={{ margin: '0', padding: '0' }}>
        <Navbar />
        <Route path="/" />
        <Route path="/card" exact component={Card} />
        <Route path="/login" exact component={Login} />
        <button onClick={getUser}>click</button>
        <button onClick={createUser}>click2</button>
      </div>
    </Router>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, photo) => dispatch(actionCreators.auth(username, photo)),
  };
};

export default connect(null, mapDispatchToProps)(App);
