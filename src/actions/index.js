import io from 'socket.io-client';
import { store } from '../index';
import { CONNECTIONS } from './types';

export const socket = io(`http://${process.env.ECHOSERVER}`);
console.log('process.env.ECHOSERVER', process.env.ECHOSERVER);

socket.on('connections', (connections) => {
  console.log(connections);

  store.dispatch({
    type: CONNECTIONS,
    payload: connections
  });
});
