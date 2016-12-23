import 'babel-core/polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import SmartComponent from './containers/SmartComponent'
import configureStore from './store/configureStore'

const store = configureStore()

import { Socket } from 'react-socket-io'

const uri = 'http://localhost:3000'
const options = { transports: ['websocket'] }

ReactDOM.render(
  <Socket uri={uri} options={options}>
    <Provider store={store}>
      <SmartComponent />
    </Provider>
  </Socket>,
  document.getElementById('root')
)
