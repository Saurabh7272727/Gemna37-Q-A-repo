import { Router } from 'express';
import mongoose from 'mongoose';
import { env } from '../config/env.js';

const router = new Router();
const startedAt = Date.now();

router.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        service: env.serviceName,
        environment: env.environment,
        uptimeSeconds: Math.floor(process.uptime()),
        timestamp: new Date().toLocaleString(),
        telemetry: {
            enabled: env.telemetry.enabled,
            endpoint: env.telemetry.endpointBase,
        },
    });
});

router.get('/ready', (req, res) => {
    const databaseReady = mongoose.connection.readyState === 1;
    const statusCode = databaseReady ? 200 : 503;

    res.status(statusCode).json({
        success: databaseReady,
        databaseReady,
        startedAt: new Date(startedAt).toLocaleString(),
        timestamp: new Date().toLocaleString(),
    });
});

export default router;
