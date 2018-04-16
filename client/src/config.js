let config = {}

config.production = {}

config.development = Object.assign({}, config.production, {
    websocket_url: 'ws://localhost:3001',
})

export default config[process.env.NODE_ENV]
