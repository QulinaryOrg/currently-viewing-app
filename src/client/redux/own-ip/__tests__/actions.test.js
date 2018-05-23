import { ownIpReceived } from '../actions';

describe('ownIpReceived', () => {
  it('creates correct action object', () => {
    expect(ownIpReceived('127.0.0.1')).toEqual({
      type: 'OWN_IP_RECEIVED',
      payload: '127.0.0.1',
    });
  });
});
