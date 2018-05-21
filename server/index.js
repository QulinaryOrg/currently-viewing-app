import WebSocket from 'ws';
import config from './config';
import { createClient } from 'redis';
import { promisify } from 'util';
import { createServer } from 'http';

const { port, redis_port, redis_url } = config;
const server = new createServer((req, res) =>  {
    res.end('Resonse from http server');
});


const wss = new WebSocket.Server({ server });

const redis = createClient({ host: redis_url, port: redis_port });

const getlistAsync = promisify(redis.lrange).bind(redis);
const hmsetAsync = promisify(redis.rpush).bind(redis);
const rpushAsync = promisify(redis.rpush).bind(redis);
const delAsync = promisify(redis.del).bind(redis);

const getConnectedUsers = async () => {
    return getlistAsync('connectedUsers', 0, -1)
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
    ws.isAlive = true;

    const clientAddress = req.connection.remoteAddress;
    const ipRegex = /\d{3}.\d{1,3}.\d{1,3}.\d{1,3}/g
    const ip = clientAddress.match(ipRegex)[0];

    ws.identifer = ip;

    addUserBlock: try {
        result = await getConnectedUsers()

        // skip duplicates
        if (result.filter((item) => item.ip === ip).length !== 0) {
            break addUserBlock;
        }

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
