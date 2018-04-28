/**
 * This wants to be a storage service ...
 * 
 * Playing with immutable.js here.
 */
const { OrderedMap } = require('immutable');

module.exports = {
  ipAddresses: {},
  push: (clientId, client) => {
    // add user from connected users object
    if (!this.ipAddresses) {
      this.ipAddresses = OrderedMap({ 
        [clientId]: { 
          address: client.address, 
          timestamp: client.issued 
        } 
      });
    }
    else {
      this.ipAddresses = this.ipAddresses.set(
        clientId, 
        { 
          address: client.address, 
          timestamp: client.issued 
        }
      );
    }
    //console.log('push', this.ipAddresses.toObject());
  },
  pop: (clientId) => {
    // remove user from connected users object
    if (this.ipAddresses) {
      this.ipAddresses = this.ipAddresses.delete(clientId);
    }
    //console.log('pop', this.ipAddresses.toObject());
  },
  connections: () => {
    return this.ipAddresses.toObject();
  }
};
