import { CONNECTIONS } from '../actions/types';

const initialState = {
  welcome: "Hello, World!"
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CONNECTIONS:
      return { ...state, connections: action.payload };
  }
  return state;
};
