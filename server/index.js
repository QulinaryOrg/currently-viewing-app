import WebSocket from 'ws';
import config from './config';
import { createServer } from 'http';
import { createClient } from 'redis';
import helper from './utils/redis_helper'

const { port, redis_port, redis_url } = config;
const server = new createServer((req, res) => {
    res.end('Resonse from http server');
});


const wss = new WebSocket.Server({ server });

const redis = createClient({ host: redis_url, port: redis_port });
const {
    hmsetAsync,
    hgetallAsync,
    hdelAsync,
    rpushAsync
} = helper(redis);

const getConnectedUsers = async () => {
    return lrangeAsync('connectedUsers', 0, -1)
        .then((list) => list.map(item => JSON.parse(item)));
};

const appendUsers = async (value) => {
    return rpushAsync('connectedUsers', JSON.stringify(value));
};

const clearAll = async () => {
    return delAsync('connectedUsers')
}

const removeUser = async (value) => {
    try {
        const users = await getConnectedUsers();
        clearAll();
        const others = users.filter(item => item.ip !== value);

        // avoid adding empty list
        if (others.length === 0) return;

        appendUsers(others);
    } catch (error) {
        console.log(error)
    }
}

wss.on('connection', async (ws, req) => {
    let result = null;
    let ip = null;
    ws.isAlive = true;

    console.log(req);
    const clientAddress = req.connection.remoteAddress;
    const matches = clientAddress.match(/\d{3}.\d{1,3}.\d{1,3}.\d{1,3}/g)
    if (matches.length === 0) {
        ip = clientAddress
    } else {
        ip = clientAddress[0];
    }
    try {
        result = await getConnectedUsers()

        const newUser = { ip, date: Date.now() }
        await appendUsers(newUser)

        result.push(newUser);
    } catch (error) {
        console.log(error)
        ws.send({ error, message: 'something went wrong connecting to you' });
        return
    }

    wss.clients.forEach((ws) => {
        if (!ws.isAlive) return ws.terminate();
        ws.send(JSON.stringify({ data: result }));
    });

    ws.on('close', async () => {
        ws.isAlive = false;
        let result = null;

        try {
            await removeUser(ws.identifer);
            result = await getConnectedUsers();
        } catch (error) {
            console.log(error);
        }

        wss.clients.forEach((ws) => {
            if (!ws.isAlive) return ws.terminate();
            ws.send(JSON.stringify({ data: result }));
        });
    })
});

server.listen(port, () => console.log('Http Server listening', port));
