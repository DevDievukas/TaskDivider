import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';

import './index.css';

firebase.initializeApp({
  apiKey: 'AIzaSyBEIzMspLyXzmy2HsHTwbsWqrSk8TjnrvU',
  authDomain: 'tvarkymas-4237a.firebaseapp.com',
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
