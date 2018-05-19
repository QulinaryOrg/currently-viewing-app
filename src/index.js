import React from 'react'
import ReactDOM from 'react-dom'

// Render typography styles
import './utils/typography'

import App from './App'

const rootElement = document.querySelector('#root')
rootElement && ReactDOM.render(<App />, rootElement)
