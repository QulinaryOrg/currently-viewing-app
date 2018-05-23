import { combineReducers } from 'redux';
import { ownIpReducer } from './own-ip/reducer';
import { ipsReducer } from './ips/reducer';

export default combineReducers({
  ownIp: ownIpReducer,
  ips: ipsReducer,
});
