import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

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
    <Router>
      <Navbar />
      {routes}
    </Router>
  );
};

export default App;
