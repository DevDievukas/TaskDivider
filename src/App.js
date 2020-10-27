import React, { useEffect, useState, useCallback } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import firebase from 'firebase';
import axios from 'axios';

import Navbar from './components/layout/Navbar';

import Auth from './pages/Auth/Auth';
import Starting from './pages/Starting/Starting';
import Main from './pages/Main/Main';
import AddGroup from './pages/AddGroup/AddGroup';
import MyTasks from './pages/MyTasks/MyTasks';
import Profile from './pages/Profile/Profile';
import Team from './pages/Team/Team';
import { AuthContext } from './shared/Context/auth-context';

const App = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let routes;

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('[App] ' + user);
      if (user) {
        props.onAuth(user.displayName, user.photoURL);
      }
    });
  }, [props]);

  console.log('[logged]' + isLoggedIn);
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/main" exact>
          <Main />
        </Route>
        <Route path="/addgroup" exact>
          <AddGroup />
        </Route>
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Route path="/team" exact>
          <Team />
        </Route>
        <Route path="/:groupId/tasks" exact>
          <MyTasks />
        </Route>
        <Redirect to="/main" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Starting />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Route path="/:groupId/tasks" exact>
          <MyTasks />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLogedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <Navbar />
        <main className="container">{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

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
//     })
// }
