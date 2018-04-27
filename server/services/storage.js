// storage service
const { Map } = require('immutable');

module.exports = {
  ipAddresses: {},
  push: (client) => {
    // add client to ipAddresses object
  },
  pop: (clientId) => {
    // remove client from ipAddresses object
  },
  get ipList () {
    return this.ipAddresses;
  }
};
