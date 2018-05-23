import { IPS_RECEIVED } from './action-types';

export function ipsReducer(state = [], { payload, type }) {
  switch (type) {
    case IPS_RECEIVED:
      return payload;

    default:
      return state;
  }
}
