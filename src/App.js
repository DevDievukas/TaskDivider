import React, { useCallback, useEffect } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from './shared/Navbar/Navbar';
import HouseNavbar from './shared/Navbar/HouseNavbar';
import Spinner from './shared/Spinner/Spinner';
import ErrorModal from './shared/UIElements/ErrorModal';

import Rooms from './Rooms/Rooms';
import People from './People/People';
import Schedule from './Schedule/Schedule';
import SharedItems from './SharedItems/SharedItems';
import Announcements from './Announcements/Annauncements';
import Houses from './House/Houses';
import Auth from './Auth/Auth';
import {
  startHouseAuth,
  startLogout,
  startUserAuth,
} from './Store/actions/Auth';
import { clearError } from './Store/actions/Loading';

const App = () => {
  const { userId, houseId, expiration } = useSelector((state) => ({
    ...state.auth,
  }));
  const { isLoading, error } = useSelector((state) => ({ ...state.load }));
  const dispatch = useDispatch();
  let logoutTimer;

  const loggingOut = () => {
    dispatch(startLogout());
  };

  const startTimer = useCallback((expirationDate) => {
    if (expirationDate) {
      const remainingTime = expirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(loggingOut, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, []);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData) {
      if (
        storedUserData.expiration &&
        new Date(storedUserData.expiration) > new Date()
      ) {
        if (storedUserData.userId) {
          dispatch(
            startUserAuth(
              storedUserData.userId,
              storedUserData.token,
              storedUserData.email,
              storedUserData.remember,
              new Date(storedUserData.expiration)
            )
          );
        } else if (storedUserData.houseId) {
          dispatch(
            startHouseAuth(
              storedUserData.houseId,
              storedUserData.token,
              storedUserData.houseName,
              storedUserData.remember,
              new Date(storedUserData.expiration)
            )
          );
        }
      } else if (!storedUserData.expiration) {
        if (storedUserData.userId) {
          dispatch(
            startUserAuth(
              storedUserData.userId,
              storedUserData.token,
              storedUserData.email,
              storedUserData.remember
            )
          );
        } else if (storedUserData.houseId) {
          dispatch(
            startHouseAuth(
              storedUserData.houseId,
              storedUserData.token,
              storedUserData.houseName,
              storedUserData.remember
            )
          );
        }
      } else {
        dispatch(startLogout());
      }
    }
  }, [dispatch]);

  useEffect(() => {
    startTimer(expiration);
  }, [expiration, startTimer]);

  let routes;

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

        <Redirect to="/" />
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
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Auth />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Router>
      <Navbar />
      <ErrorModal error={error} onClear={() => dispatch(clearError())} />
      {isLoading && <Spinner asOverlay />}
      {routes}
    </Router>
  );
};

export default App;
