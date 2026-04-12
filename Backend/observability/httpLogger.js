import { logger } from './logger.js';

const sanitizeHeaders = (headers) => {
    const clonedHeaders = { ...headers };

    for (const key of Object.keys(clonedHeaders)) {
        if (/(authorization|cookie|set-cookie|x-api-key)/i.test(key)) {
            clonedHeaders[key] = '[REDACTED]';
        }
    }

    return clonedHeaders;
};

export const httpLoggerMiddleware = (req, res, next) => {
    const startedAt = process.hrtime.bigint();

    res.on('finish', () => {
        const durationInMs = Number(process.hrtime.bigint() - startedAt) / 1_000_000;
        const level = res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'http';
        logger.log(level, 'HTTP request completed', {
            method: req.method,
            path: req.originalUrl || req.url,
            statusCode: res.statusCode,
            durationMs: Number(durationInMs.toFixed(2)),
        });
    });

    next();
};
