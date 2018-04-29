import io from 'socket.io-client';
import { store } from '../index';
import { CONNECTIONS } from './types';

export const socket = io(`http://${process.env.ECHO_SERVER}`);
console.log('process.env.ECHO_SERVER', process.env.ECHO_SERVER);

socket.on('connections', (connections) => {
  console.log(connections);

  store.dispatch({
    type: CONNECTIONS,
    payload: connections
  });
});
