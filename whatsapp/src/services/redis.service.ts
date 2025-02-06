import { createClient } from 'redis';

const redisClient = createClient({
  url: 'redis://redis-srv:6379',
}).on('error', (err) => console.log('Redis Client Error', err));

redisClient.connect();

export { redisClient };
