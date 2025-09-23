// const { Worker, QueueEvents } = require('bullmq');
// const dotenv = require('dotenv');
import { Worker, QueueEvents } from 'bullmq';
import dotenv from 'dotenv';
import emailSender from '../Email/email.genration.js';
dotenv.config();


const getRedisConnection = () => ({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
});

const queueName = process.env.QUEUE_NAME || 'emailQueue';

// Worker
const worker = new Worker(
    queueName,
    async job => {
        const data = job.data;
        // Optionally validate data here.
        try {
            const person = await emailSender(data.email, data.branch, 123456, { ...data });
            console.log(person);
            return { success: true };
        } catch (err) {
            // throw to let BullMQ handle attempts/backoff
            console.error('Job failed', job.id, err);
            throw err;
        }
    },
    {
        connection: getRedisConnection(),
        concurrency: 5, // tune to your capacity
        lockDuration: 300000, // 5 minutes, increase if PDF gen is slow
    }
);

// Optional: queue events for monitoring/logs
const qEvents = new QueueEvents(queueName, { connection: getRedisConnection() });

qEvents.on('failed', ({ jobId, failedReason }) => {
    console.warn(`Job ${jobId} failed:`, failedReason);
});

qEvents.on('completed', ({ jobId }) => {
    console.log(`Job ${jobId} completed`);
});

worker.on('error', err => {
    console.error('Worker error', err);
});

// Graceful shutdown on SIGINT/SIGTERM
process.on('SIGINT', async () => {
    console.log('Stopping worker...');
    await worker.close();
    await qEvents.close();
    process.exit(0);
});
