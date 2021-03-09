import { Provider } 			from 	'react-redux'
import {
	applyMiddleware,
	createStore
} 												from 'redux'
import { ThemeProvider } 	from 'styled-components'
import React 							from 'react'
import ReactDOM 					from 'react-dom'
import thunk 							from 'redux-thunk'

import App 								from './App'
import rootReducer				from './Store/reducers/rootReducers'
import * as serviceWorker from './serviceWorker'
import * as theme 				from './shared/styled-components/theme'
import												 './index.css'

const auth = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
	<Provider store={auth}>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</Provider>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
