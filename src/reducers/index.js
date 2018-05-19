import { combineReducers } from 'redux';
import appReducer from './app_reducer';

const rootReducer = combineReducers({
  application: appReducer
});

export default rootReducer;
