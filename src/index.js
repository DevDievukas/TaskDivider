import { Provider } 			from 'react-redux'
import { ThemeProvider } 	from 'styled-components'
import React 							from 'react'
import ReactDOM 					from 'react-dom'

import App 								from './App'
import store							from './Store/store.js'
import * as theme 				from './shared/styled-components/theme'
import												 './index.css'

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)

