import { createClient } from 'redis';
import helper from './redis_helper';
import config from '../config';
import constants from './constants';
import logger from './logger'

const { REDIS_IP_KEY } = constants;
const { redis_port, redis_url } = config;

// should be a sigleton if file is imported multiple times to aviod multiple clients
const redis = createClient({ host: redis_url, port: redis_port });

logger.info('Redis connection established.');


const {
    hmsetAsync,
    hgetallAsync,
    hsetAsync,
    hdelAsync,
    hgetAsync
} = helper(redis);

logger.info('Purging cache...');
redis.flushall();
logger.info('Purging cache completed!');


/// return object of ip->noOfConnections
export const getConnectedUsers = async () => {
    return hgetallAsync(REDIS_IP_KEY)
};

/// clear redis cache
export const clearAll = async () => {
    return delAsync(REDIS_IP_KEY)
}

/// remove item from redis cache
export const removeUser = async (key) => {
    try {
        const count = await hgetAsync(REDIS_IP_KEY, key) || '0'
        const noOfConnections = parseInt(count) - 1;
        if (noOfConnections <= 0) {
            await hdelAsync(REDIS_IP_KEY, key);
        } else {
            await hsetAsync(REDIS_IP_KEY, key, noOfConnections);
        }
    } catch (error) {
        logger.error(error); // should use a loggine mechanism
    }
}

export const appendUsers = async (key) => {
    const count = await hgetAsync(REDIS_IP_KEY, key) || '0'
    return await hsetAsync(REDIS_IP_KEY, key, parseInt(count) + 1);
}
