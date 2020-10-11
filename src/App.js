import React, { useEffect} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Redirect, Switch, useHistory } from 'react-router';
import { connect, useSelector  } from 'react-redux';
import firebase from 'firebase';
// import axios from 'axios';

import Navbar from './components/layout/Navbar';
import * as actionCreators from './store/actions/index';

import Auth from './pages/Auth/Auth';
import Starting from './pages/Starting/Starting';
import Main from './pages/Main/Main';
import AddGroup from './pages/AddGroup/AddGroup';
import MyTasks from './pages/MyTasks/MyTasks';
import Profile from './pages/Profile/Profile';
import Team from './pages/Team/Team';


const App = (props) => {
  
  const history = useHistory();
  const validity = useSelector(state => state.valid);


  // const user = {
  //   displayName: 'Boyka',
  //   email: 'Boykagmailcom',
  // };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('[App] ' + user);
      if (user) {
        props.onAuth(user.displayName, user.photoURL);
      }
    });
  }, [props]);


  // function getUser() {
  //   axios
  //     .get(`https://tvarkymas-4237a.firebaseio.com/Users/${user.email}.json`)
  //     .then((response) => {
  //       if (!response.data) {
  //         createUser();
  //       } else {
  //         console.log('[App][success]' + response.data);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log('[App][fail}' + err);
  //     });
  // }

  // function createUser() {
  //   axios
  //     .post(
  //       `https://tvarkymas-4237a.firebaseio.com/Users/${user.email}.json`,
  //       user
  //     )
  //     .then((res) => {
  //       console.log('[App]' + res);
  //     })
  //     .catch((err) => {
  //       console.log('[App] ' + err);
  //     });
  // }

  const redirection = validity ? <Redirect to="/main" /> : <Redirect to="/" />;

  console.log('[validity] ' + validity);
  return (
    // <Router>
    <React.Fragment>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/" exact>
            <Starting />
          </Route>
          <Route path="/auth" exact>
            <Auth />
          </Route>
          <Route path="/main" exact >
            <Main />
          </Route>
          <Route path="/addgroup" exact>
            <AddGroup />
          </Route>
          <Route path="/:groupId/tasks" exact >
            <MyTasks />
          </Route>
          <Route path="/profile" exact>
            <Profile />
          </Route>
          <Route path="/team" exact >
            <Team />
          </Route>
          {redirection}
        </Switch>
      </div>
    </React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, photo) => dispatch(actionCreators.auth(username, photo)),
  };
};

export default connect(null, mapDispatchToProps)(App);
