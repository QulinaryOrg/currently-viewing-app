import { createClient } from 'redis';
import helper from './redis_helper';
import config from '../config';
import constants from './constants';

const { REDIS_IP_KEY } = constants;
const { redis_port, redis_url } = config;
const redis = createClient({ host: redis_url, port: redis_port });
console.log('Redis connection established.', REDIS_IP_KEY)

const {
    hmsetAsync,
    hgetallAsync,
    hsetAsync,
    hdelAsync,
    hgetAsync
} = helper(redis);

/// return object of ip->noOfConnections
export const getConnectedUsers = async () => {
    return hgetallAsync(REDIS_IP_KEY)
};

/// delete cache
export const clearAll = async () => {
    return delAsync(REDIS_IP_KEY)
}

export const removeUser = async (key) => {
    try {
        const count = await hgetAsync(REDIS_IP_KEY, key) || '0'
        console.log('remove', count);
        const noOfConnections = parseInt(count) - 1;
        if (noOfConnections <= 0) {
            await hdelAsync(REDIS_IP_KEY, key);
        } else {
            await hsetAsync(REDIS_IP_KEY, key, noOfConnections);
        }
    } catch (error) {
        console.log(error);
    }
}

export const appendUsers = async (key) => {
    const count = await hgetAsync(REDIS_IP_KEY, key) || '0'
    console.log('appendUser', count);
    return await hsetAsync(REDIS_IP_KEY, key, parseInt(count) + 1);
}
