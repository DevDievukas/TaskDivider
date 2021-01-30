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

import { useSelector, useDispatch } from 'react-redux';

import Navbar from './shared/Navbar/Navbar';
import HouseNavbar from './shared/Navbar/HouseNavbar';

import Rooms from './Rooms/Rooms';
import People from './People/People';
import Schedule from './Schedule/Schedule';
import SharedItems from './SharedItems/SharedItems';
import Announcements from './Announcements/Annauncements';
import Houses from './House/Houses';
import Auth from './Auth/Auth';

const App = () => {
  const counter = useSelector((state) => state);
  const dispatch = useDispatch();
  const { token, login, logout, userId, houseId, name } = useAuth();
  let routes = (
    <Switch>
      <Route path="/" exact>
        <Auth />
      </Route>
      <ProtectedRoute path="/:houseId/Schedule" exact>
        <HouseNavbar />
        <Schedule />
      </ProtectedRoute>
      <ProtectedRoute path="/Houses" exact>
        <Houses />
      </ProtectedRoute>
      <ProtectedRoute path="/:houseId/announcements" exact>
        <HouseNavbar />
        <Announcements />
      </ProtectedRoute>
      <ProtectedRoute path="/:houseId/shareditems" exact>
        <HouseNavbar />
        <SharedItems />
      </ProtectedRoute>
      <ProtectedRoute path="/:houseId/rooms" exact>
        <HouseNavbar />
        <Rooms />
      </ProtectedRoute>
      <ProtectedRoute path="/:houseId/people" exact>
        <HouseNavbar />
        <People />
      </ProtectedRoute>
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
        houseId: houseId,
        name: name,
      }}
    >
      <Router>
        <Navbar />
        <button onClick={() => dispatch({ type: 'Car' })}>Car</button>
        <h1>{counter.vehicle}</h1>
        <button onClick={() => dispatch({ type: 'Bike' })}>Bike</button>
        {/* {routes} */}
      </Router>
    </AuthContext.Provider>
  );
};

// REACT_APP_BACKEND_URL=http://localhost:5000/api

export default App;
