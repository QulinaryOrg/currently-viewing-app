import { OWN_IP_RECEIVED } from './action-types';

export function ownIpReducer(state = '', { payload, type }) {
  switch (type) {
    case OWN_IP_RECEIVED:
      return payload;

    default:
      return state;
  }
}
