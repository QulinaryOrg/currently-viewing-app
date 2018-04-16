// Modules
const WebSocket = require('ws')

// Models
const Addresses = require('../model/addresses')

/**
 * @param {object} http
 * @return {object}
 */
function listen(http) {
  const server = new WebSocket.Server({ server: http })

  server.broadcast = (data) => {
    server.clients.forEach((client) => {
      client.send(data)
    })
  }

  server.broadcastAction = (type, payload) => {
    server.broadcast(
      JSON.stringify({ type, payload })
    )
  }

  server.on('connection', (client, req) => {
    handleConnection(server, client, req)

    client.on('close', handleClose.bind(null, server, client))
  })

  keepAlive(server, 5000)

  return server
}

/**
 * @param {object} server
 * @param {object} client
 * @param {object} req
 */
function handleConnection(server, client, req) {
  client.address = req.connection.remoteAddress

  Addresses.append(client.address)
  server.broadcastAction('CLIENT_JOIN', {
    data: Addresses.get(),
    meta: {
      diff: client.address,
    },
  })
}

/**
 * @param {object} server
 * @param {object} client
 */
function handleClose(server, client) {
  Addresses.remove(client.address)
  server.broadcastAction('CLIENT_LEAVE', {
    data: Addresses.get(),
    meta: {
      diff: client.address,
    },
  })
}

/**
 * @param {object} server
 * @param {number} delay
 */
function keepAlive(server, delay) {
  server.on('connection', (client) => {
    client.isAlive = true

    client.on('pong', () => {
      client.isAlive = true
    })
  })

  return setInterval(() => {
    server.clients.forEach((client) => {
      if (!client.isAlive) return client.terminate()

      client.isAlive = false
      client.ping(() => undefined)
    })
  }, delay)
}

module.exports = { listen }
