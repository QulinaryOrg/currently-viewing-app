import WebSocket from 'ws';
import config from './config';
import { createClient } from 'redis';
import { promisify } from 'util';
import { createServer } from 'http';

const { port } = config;
const server = new createServer();
const wss = new WebSocket.Server({ server, port });
console.log('Websocket listening on port:', port);

wss.on('connection', (ws, req) => {
    console.log(req.connection.remoteAddress);
})

wss.on('close', () => console.log('connection closed'));


