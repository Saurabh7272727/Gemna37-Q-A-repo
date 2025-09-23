// const { Redis } = require('ioredis');
// const dotenv = require('dotenv');
import { Redis } from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redis = new Redis({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
    // password: process.env.REDIS_PASS, // if set
});

export default redis;
