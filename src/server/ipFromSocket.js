import get from 'lodash.get';

const ipFromSocket = socket => {
  // access ip from the multiple locations it could be at
  let ip;
  if (get(socket, 'request.connection.remoteAddress')) {
    ip = socket.request.connection.remoteAddress;
  }
  if (get(socket, 'handshake.address')) {
    ip = socket.handshake.address;
  }
  if (get(socket, 'handshake.headers["x-forwarded-for"]')) {
    ip = socket.handshake.headers['x-forwarded-for'].split(',')[0];
  }

  // strip off the ::ffff: that ipv4 addresses get given
  if (ip.substr(0, 7) === '::ffff:') {
    ip = ip.substr(7);
  }

  // display 127.0.0.1 instead of ::1
  if (ip === '::1') {
    ip = '127.0.0.1';
  }

  return ip;
};

export default ipFromSocket;
