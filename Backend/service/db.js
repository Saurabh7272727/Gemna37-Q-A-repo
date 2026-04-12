import mongoose from 'mongoose';
import { env } from '../config/env.js';
import { logger } from '../observability/logger.js';

const connectDataBaseURL = async () => {
    if (!env.databaseUrl) {
        throw new Error('DATABASE_URL or BATABASE_URL is required to connect to MongoDB');
    }

    logger.info('Connecting to MongoDB');

    await mongoose.connect(env.databaseUrl, {
        serverSelectionTimeoutMS: 10000,
    });

    logger.info('Connected to MongoDB', {
        host: mongoose.connection.host,
        name: mongoose.connection.name,
    });
};

export default connectDataBaseURL;
