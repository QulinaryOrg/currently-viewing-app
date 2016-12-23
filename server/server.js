var loopback = require('loopback')
var boot = require('loopback-boot')
var app = module.exports = loopback()
var webpack = require('webpack')
var env = require('./environment')
var mode = process.env.NODE_ENV || env.DEVELOPMENT
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require(`../webpack.config.${mode}`)
var compiler = webpack(config)

if (mode === env.DEVELOPMENT) {
    // only need in development
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
}
app.use(webpackHotMiddleware(compiler))

boot(app, __dirname)

app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit('started')
    var baseUrl = app.get('url').replace(/\/$/, '')
    console.log('Web server listening at: %s', baseUrl)
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath)
    }
  })
}

//
// Implementation of test assesment
//
if (require.main === module) {
  app.io = require('socket.io')(app.start())

  // Client connects
  app.io.on('connection', function (socket) {
    let connectedIp = []

    // On client connection the system generates list of all connected clients
    for (let socket in app.io.sockets.clients().connected) {
      connectedIp.push(app.io.sockets.clients().connected[socket].conn.remoteAddress)
    }

    // Then socket emit event with list of all connected clients
    app.io.sockets.emit('connectedIPs', connectedIp)
  })
}
