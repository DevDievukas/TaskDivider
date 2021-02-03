import React, { useEffect } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from './shared/Navbar/Navbar';
import HouseNavbar from './shared/Navbar/HouseNavbar';

import Rooms from './Rooms/Rooms';
import People from './People/People';
import Schedule from './Schedule/Schedule';
import SharedItems from './SharedItems/SharedItems';
import Announcements from './Announcements/Annauncements';
import Houses from './House/Houses';
import Auth from './Auth/Auth';
import { startHouseAuth, startUserAuth } from './Store/actions/Auth';

const App = () => {
  const { userId, houseId } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData && storedUserData.userId) {
      dispatch(
        startUserAuth(
          storedUserData.userId,
          storedUserData.token,
          storedUserData.email
        )
      );
    } else if (storedUserData && storedUserData.houseId) {
      dispatch(
        startHouseAuth(
          storedUserData.houseId,
          storedUserData.token,
          storedUserData.houseName
        )
      );
    }
  }, []);

  let routes = (
    <Switch>
      <Route path="/" exact>
        <Auth />
      </Route>
      <Redirect to="/" />
    </Switch>
  );

  if (userId) {
    routes = (
      <Switch>
        <Route path="/:houseId/Schedule" exact>
          <HouseNavbar />
          <Schedule />
        </Route>
        <Route path="/" exact>
          <Houses />
        </Route>
        <Route path="/:houseId/announcements" exact>
          <HouseNavbar />
          <Announcements />
        </Route>
        <Route path="/:houseId/shareditems" exact>
          <HouseNavbar />
          <SharedItems />
        </Route>
        <Route path="/:houseId/rooms" exact>
          <HouseNavbar />
          <Rooms />
        </Route>
        <Route path="/:houseId/people" exact>
          <HouseNavbar />
          <People />
        </Route>
      </Switch>
    );
  } else if (houseId) {
    routes = (
      <Switch>
        <Route path="/schedule" exact>
          <HouseNavbar />
          <Schedule />
        </Route>
        <Route path="/" exact>
          <HouseNavbar />
          <Announcements />
        </Route>
        <Route path="/shareditems" exact>
          <HouseNavbar />
          <SharedItems />
        </Route>
        <Route path="/rooms" exact>
          <HouseNavbar />
          <Rooms />
        </Route>
        <Route path="/people" exact>
          <HouseNavbar />
          <People />
        </Route>
      </Switch>
    );
  }

  return (
    <Router>
      <Navbar />
      {routes}
    </Router>
  );
};

export default App;
