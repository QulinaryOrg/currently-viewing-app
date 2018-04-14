// Modules
const express = require('express')
const http = require('http')

const routes = require('./config/routes')
const websocket = require('./websocket')

// Variables
const PORT = process.env.PORT || 8080

// Instances
const app = express()

// Express config
app.enable('trust proxy')

// Express routes
routes(app)

// Run server
const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`)
})

// Run websocket
const wss = websocket.listen(server)
