import React, { useEffect, useSelector } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from 'firebase';
import axios from 'axios';

import Navbar from './components/layout/Navbar';
import * as actionCreators from './store/actions/index';
import Card from './components/Card/Card';

import Auth from './pages/Auth/Auth';
import Starting from './pages/Starting/Starting';
import Main from './pages/Main/Main';
import AddGroup from './pages/AddGroup/AddGroup';
import Groups from './pages/Groups/Groups';
import MyTasks from './pages/MyTasks/MyTasks';
import Profile from './pages/Profile/Profile';
import Team from './pages/Team/Team';

  
function App(props) {

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
      <Navbar />
      <div className="container">
        <Route path="/" exact component={Starting}/>
        <Route path="/auth" exact component={Auth} />
        <Route path="/main" exact component={Main} />
        <Route path="/addgroup" exact component={AddGroup} />
        <Route path="/groups" exact component={Groups} />
        <Route path="/mytasks" exact component={MyTasks} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/team" exact component={Team} />
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
