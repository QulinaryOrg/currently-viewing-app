import { promisify } from 'util';

export default (redis) => {

    const lrangeAsync = promisify(redis.lrange).bind(redis);
    const hsetAsync = promisify(redis.hset).bind(redis);
    const hgetAsync = promisify(redis.hget).bind(redis);
    const hgetallAsync = promisify(redis.hgetall).bind(redis);
    const hdelAsync = promisify(redis.hdel).bind(redis);
    const rpushAsync = promisify(redis.rpush).bind(redis);
    const delAsync = promisify(redis.del).bind(redis);

    return {
        lrangeAsync,
        hsetAsync,
        hgetAsync,
        hgetallAsync,
        hdelAsync, 
        rpushAsync,
        delAsync,
    }
};
