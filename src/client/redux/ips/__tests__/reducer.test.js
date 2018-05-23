import { ipsReducer } from '../reducer';

describe('ipsReducer', () => {
  it('correctly handles IPS_RECEIVED action', () => {
    const state = ipsReducer([], {
      payload: ['127.0.0.1', '206.189.115.20'],
      type: 'IPS_RECEIVED',
    });
    expect(state).toEqual(['127.0.0.1', '206.189.115.20']);
  });
});
