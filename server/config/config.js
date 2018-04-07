module.exports = {
    node: {
      port: process.env.NODE_PORT || process.env.PORT || 8080,
    },
    mongo: {
      host: process.env.MONGO_HOST || '127.0.0.1',
      port: process.env.MONGO_PORT || 27017,
    },
  };
  