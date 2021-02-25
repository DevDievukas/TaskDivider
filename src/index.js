import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import authReducer from './Store/reducers/authReducer';
import loadingReducer from './Store/reducers/loadingReducer';
import thunk from 'redux-thunk';
import { ThemeProvider } from 'styled-components';

import * as theme from './shared/styled-components/theme';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const rootReducer = combineReducers({
  auth: authReducer,
  load: loadingReducer,
});

const auth = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={auth}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
