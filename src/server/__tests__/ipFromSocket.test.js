import ipFromSocket from '../ipFromSocket';

it('gets the ip from a socket x-forwarded-for', () => {
  const socket = {
    handshake: {
      headers: {
        'x-forwarded-for': '206.189.115.20, 137.294.284.50, 172.249.248.33',
      },
    },
  };

  expect(ipFromSocket(socket)).toEqual('206.189.115.20');
});

it('gets the ip from a socket remoteAddress', () => {
  const socket = {
    request: {
      connection: {
        remoteAddress: '206.189.115.20',
      },
    },
  };

  expect(ipFromSocket(socket)).toEqual('206.189.115.20');
});

it('gets the ip from a socket address', () => {
  const socket = {
    handshake: {
      address: '206.189.115.20',
    },
  };

  expect(ipFromSocket(socket)).toEqual('206.189.115.20');
});

it('correctly prioritizes x-forwarded-for over address and remoteAddress', () => {
  const socket = {
    handshake: {
      headers: {
        'x-forwarded-for': '206.189.115.20, 137.294.284.50, 172.249.248.33',
      },
      address: '493.439.339.40',
    },
    request: {
      connection: {
        remoteAddress: '598.273.593.90',
      },
    },
  };

  expect(ipFromSocket(socket)).toEqual('206.189.115.20');
});

it('correctly prioritizes address over remoteAddress', () => {
  const socket = {
    handshake: {
      address: '493.439.339.40',
    },
    request: {
      connection: {
        remoteAddress: '598.273.593.90',
      },
    },
  };

  expect(ipFromSocket(socket)).toEqual('493.439.339.40');
});

it('turns ::1 into 127.0.0.1', () => {
  const socket = {
    request: {
      connection: {
        remoteAddress: '::1',
      },
    },
  };

  expect(ipFromSocket(socket)).toEqual('127.0.0.1');
});

it('strips off ::ffff: from the start of ips', () => {
  const socket = {
    request: {
      connection: {
        remoteAddress: '::ffff:127.0.0.1',
      },
    },
  };

  expect(ipFromSocket(socket)).toEqual('127.0.0.1');
});
