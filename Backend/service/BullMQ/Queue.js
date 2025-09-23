import { Queue } from 'bullmq';
import dotenv from 'dotenv';

dotenv.config();

const connection = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
};

const queueName = process.env.QUEUE_NAME || 'emailQueue';
const emailQueue = new Queue(queueName, { connection });


async function queue(jobId, payload, opts = {}) {
    // opts can include attempts/backoff/etc
    const job = await emailQueue.add('sendEmail', payload, {
        jobId,
        attempts: opts.attempts ?? 3,
        backoff: opts.backoff ?? { type: 'exponential', delay: 1000 },
        removeOnComplete: { age: 3600, count: 100 },
        removeOnFail: { age: 86400, count: 1000 },
        ...opts,
    });
    return job;
}

// Example usage:
// if (require.main === module) {
//     (async () => {
//         const job = await enqueueEmail({
//             to: 'recipient@example.com',
//             subject: 'Here is your PDF',
//             templateData: { name: 'Bob', message: 'Thanks for using us!' },
//             metadata: { userId: 'user-123' },
//         });
//         console.log('Enqueued job', job.id);
//         process.exit(0);
//     })();
// }

// module.exports = { enqueueEmail };

export default queue;
