import Redis from "ioredis";
import { env } from '../../config/env.js';
import { logger } from '../../observability/logger.js';

const redis = env.redis.url
    ? new Redis(env.redis.url)
    : new Redis({
        host: env.redis.host,
        port: env.redis.port,
        password: env.redis.password || undefined,
    });

redis.on('error', (error) => {
    logger.warn('Redis client connection issue', { message: error.message });
});

export default redis;
