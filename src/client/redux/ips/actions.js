import { IPS_RECEIVED } from './action-types';

export const ipsReceived = ips => ({
  type: IPS_RECEIVED,
  payload: ips,
});
