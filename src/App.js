import React, { useEffect, useSelector } from 'react';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Card from './components/Card/Card';
import Auth from './pages/Auth/Auth';
import { connect } from 'react-redux';
import * as actionCreators from './store/actions/index';
import firebase from 'firebase';
import axios from 'axios';

function App(props) {
  


  const DUMMY_DATA = {
    image: 'https://i.ibb.co/YDgsCbY/IMG-20200817-061706.jpg',
    name: 'Norbertas',
    description: 'reikia susitvarkyti kambary',
  };

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
      <div className="container" style={{ margin: '0', padding: '0' }}>
        <Route path="/" />
        <Route path="/auth" exact component={Auth} />
      </div>

      <div style={{ display: 'none' }}>
        <Card
          img={DUMMY_DATA.image}
          name={DUMMY_DATA.name}
          description={DUMMY_DATA.description}
        />
        <Card
          img={DUMMY_DATA.image}
          name={DUMMY_DATA.name}
          description={DUMMY_DATA.description}
        />
        <Card
          img={DUMMY_DATA.image}
          name={DUMMY_DATA.name}
          description={DUMMY_DATA.description}
        />
        <Card
          img={DUMMY_DATA.image}
          name={DUMMY_DATA.name}
          description={DUMMY_DATA.description}
        />
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
