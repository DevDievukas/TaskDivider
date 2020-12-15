import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { AuthContext } from './shared/Context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

import Navbar from './shared/Navbar/Navbar';

import Rooms from './Rooms/Rooms';
import Schedule from './Schedule/Schedule';
import SharedItems from './SharedItems/SharedItems';
import Announcements from './Announcements/Annauncements';
import Auth from './Auth/Auth';
import Main from './Main/Main';
import Houses from './House/Houses';
import House from './House/House';
import RoomsManager from './House/Rooms';
import People from './House/People';

const App = () => {
  const { token, login, logout, userId } = useAuth();
  let routes = (
    <Switch>
      <Route path="/" exact>
        <Main />
      </Route>
      <Route path="/Schedule" exact>
        <Schedule />
      </Route>
      <ProtectedRoute path="/Houses" exact>
        <Houses />
      </ProtectedRoute>
      <ProtectedRoute path="/House/:houseId" exact>
        <House />
      </ProtectedRoute>
      <Route path="/announcements" exact>
        <Announcements />
      </Route>
      <Route path="/shareditems" exact>
        <SharedItems />
      </Route>
      <Route path="/rooms" exact>
        <Rooms />
      </Route>
      <ProtectedRoute path="/house/rooms" exact>
        <RoomsManager />
      </ProtectedRoute>
      <ProtectedRoute path="/house/people" exact>
        <People />
      </ProtectedRoute>
      <Route path="/Auth" exact>
        <Auth />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
  return (
    <AuthContext.Provider
      value={{
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <Navbar />
        <main className="container">{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
