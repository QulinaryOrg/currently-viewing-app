import { promisify } from 'util';

export default (redis) => {

    const lrangeAsync = promisify(redis.lrange).bind(redis);
    const hmsetAsync = promisify(redis.rpush).bind(redis);
    const hgetallAsync = promisify(redis.hgetall).bind(redis);
    const hdelAsync = promisify(redis.hdel).bind(redis);
    const rpushAsync = promisify(redis.rpush).bind(redis);
    const delAsync = promisify(redis.del).bind(redis);

    return {
        lrangeAsync,
        hmsetAsync,
        hgetallAsync,
        hdelAsync, 
        rpushAsync,
        delAsync,
    }
};
