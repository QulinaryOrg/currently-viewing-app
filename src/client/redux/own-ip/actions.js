import { OWN_IP_RECEIVED } from './action-types';

export const ownIpReceived = ip => ({
  type: OWN_IP_RECEIVED,
  payload: ip,
});
