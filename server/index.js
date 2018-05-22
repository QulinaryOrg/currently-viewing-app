import WebSocket from 'ws';
import config from './config';
import { createServer } from 'http';
import {
    getConnectedUsers,
    clearAll,
    removeUser,
    appendUsers
} from './utils/ip_manager'

const { port } = config;
const server = new createServer((req, res) => {
    res.end('Resonse from http server');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', async (ws, req) => {
    let result = null;
    let ip = null;

    const clientAddress = req.connection.remoteAddress;
    const matches = clientAddress.match(/\d{3}.\d{1,3}.\d{1,3}.\d{1,3}/g)

    ip = (matches && matches.length !== 0) ? match[0] : clientAddress;

    ws.identifer = ip

    try {
        await appendUsers(ip);
        result = await getConnectedUsers();
    } catch (error) {
        console.log(error)
        ws.send({ error, message: 'something went wrong connecting to you' });
        return
    }

    wss.clients.forEach((ws) => {
        if (ws.readyState === ws.CLOSED) { return ws.terminate(); }
        ws.send(JSON.stringify({ data: result }));
    });

    const token = setInterval(() => {
        wss.clients.forEach((ws) => {
            if (ws.readyState === ws.CLOSED) {
                ws.terminate();
            }
        });
    }, 30000);

    ws.on('close', async () => {
        clearInterval(token);

        try {
            console.log('ws id', ws.identifer);
            await removeUser(ws.identifer);
            result = await getConnectedUsers();
        } catch (error) {
            console.log(error);
        }

        wss.clients.forEach((ws) => {
            if (ws.readyState === ws.CLOSED) ws.terminate();
            ws.send(JSON.stringify({ data: result }));
        });
    })
});

server.listen(port, () => console.log('Http Server listening', port));
