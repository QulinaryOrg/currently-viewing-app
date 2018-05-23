import { ownIpReducer } from '../reducer';

describe('ownIpReducer', () => {
  it('correctly handles OWN_IP_RECEIVED action', () => {
    const state = ownIpReducer('', {
      payload: '127.0.0.1',
      type: 'OWN_IP_RECEIVED',
    });
    expect(state).toEqual('127.0.0.1');
  });
});
