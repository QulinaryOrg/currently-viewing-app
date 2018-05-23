import createIpTracker from '../createIpTracker';

it('works with no ips', () => {
  const ipTracker = createIpTracker();
  expect(ipTracker.getIps()).toEqual([]);
});

it('works with one user one one ip', () => {
  const ipTracker = createIpTracker();
  ipTracker.handleConnect('127.0.0.1');
  expect(ipTracker.getIps()).toEqual(['127.0.0.1']);
  ipTracker.handleDisconnect('127.0.0.1');
  expect(ipTracker.getIps()).toEqual([]);
});

it('works with multiple users on each ip', () => {
  const ipTracker = createIpTracker();

  ipTracker.handleConnect('127.0.0.1');
  expect(ipTracker.getIps()).toEqual(['127.0.0.1']);
  ipTracker.handleConnect('127.0.0.1');
  expect(ipTracker.getIps()).toEqual(['127.0.0.1']);

  ipTracker.handleDisconnect('127.0.0.1');
  expect(ipTracker.getIps()).toEqual(['127.0.0.1']);
  ipTracker.handleDisconnect('127.0.0.1');
  expect(ipTracker.getIps()).toEqual([]);
});

it('works with multiple ips and is ordered correctly', () => {
  const ipTracker = createIpTracker();

  ipTracker.handleConnect('127.0.0.1');
  expect(ipTracker.getIps()).toEqual(['127.0.0.1']);
  ipTracker.handleConnect('206.189.115.20');
  expect(ipTracker.getIps()).toEqual(['206.189.115.20', '127.0.0.1']);

  ipTracker.handleDisconnect('127.0.0.1');
  expect(ipTracker.getIps()).toEqual(['206.189.115.20']);
  ipTracker.handleDisconnect('206.189.115.20');
  expect(ipTracker.getIps()).toEqual([]);
});

it('works with lots of ips', () => {
  const ipTracker = createIpTracker();

  ipTracker.handleConnect('127.0.0.1');
  ipTracker.handleConnect('206.189.115.20');
  ipTracker.handleConnect('127.0.0.1');
  ipTracker.handleConnect('206.189.115.20');
  ipTracker.handleConnect('127.0.0.1');
  ipTracker.handleConnect('206.189.115.20');
  ipTracker.handleConnect('127.0.0.1');
  ipTracker.handleConnect('577.888.333.10');
  ipTracker.handleConnect('206.189.115.20');
  ipTracker.handleConnect('127.0.0.1');
  ipTracker.handleDisconnect('577.888.333.10');
  ipTracker.handleConnect('577.888.333.10');
  ipTracker.handleConnect('206.189.115.20');
  ipTracker.handleConnect('127.0.0.1');

  expect(ipTracker.getIps()).toEqual([
    '577.888.333.10',
    '206.189.115.20',
    '127.0.0.1',
  ]);

  ipTracker.handleDisconnect('206.189.115.20');
  ipTracker.handleDisconnect('127.0.0.1');
  ipTracker.handleDisconnect('206.189.115.20');
  ipTracker.handleDisconnect('127.0.0.1');
  ipTracker.handleDisconnect('206.189.115.20');
  ipTracker.handleDisconnect('127.0.0.1');
  ipTracker.handleDisconnect('206.189.115.20');
  ipTracker.handleDisconnect('127.0.0.1');
  ipTracker.handleDisconnect('206.189.115.20');
  ipTracker.handleDisconnect('127.0.0.1');
  ipTracker.handleDisconnect('206.189.115.20');
  ipTracker.handleDisconnect('127.0.0.1');

  expect(ipTracker.getIps()).toEqual(['577.888.333.10']);
});
