export default {
    port: 8000,
    redis_url: process.env.REDIS_SERVER  || 'localhost',
    redis_port: 6379
}