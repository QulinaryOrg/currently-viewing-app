import { ipsReceived } from '../actions';

describe('ipsReceived', () => {
  it('creates correct action object', () => {
    expect(ipsReceived(['127.0.0.1', '206.189.115.20'])).toEqual({
      type: 'IPS_RECEIVED',
      payload: ['127.0.0.1', '206.189.115.20'],
    });
  });
});
