import {
	applyMiddleware,
	createStore
} 										  from 'redux'
import thunk            from 'redux-thunk'

import rootReducer      from './reducers/rootReducers'

export default createStore(rootReducer, applyMiddleware(thunk))