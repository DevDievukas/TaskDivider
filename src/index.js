import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Auth from './store/reducers/Auth';
import firebase from 'firebase';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';

firebase.initializeApp({
  apiKey: 'AIzaSyBEIzMspLyXzmy2HsHTwbsWqrSk8TjnrvU',
  authDomain: 'tvarkymas-4237a.firebaseapp.com',
});

const store = createStore(Auth);

ReactDOM.render(
  <Provider store={store}>
    <Router>
    <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
