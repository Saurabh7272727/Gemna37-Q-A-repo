import { AsyncLocalStorage } from 'node:async_hooks';
import { randomUUID } from 'node:crypto';

const asyncLocalStorage = new AsyncLocalStorage();

const extractClientIp = (req) => {
    const forwardedFor = req.headers['x-forwarded-for'];
    if (typeof forwardedFor === 'string' && forwardedFor.length > 0) {
        return forwardedFor.split(',')[0].trim();
    }

    return req.ip || req.socket?.remoteAddress || 'unknown';
};

export const requestContextMiddleware = (req, res, next) => {
    const requestId = req.headers['x-request-id'] || randomUUID();
    const store = {
        requestId,
        method: req.method,
        path: req.originalUrl || req.url,
        ip: extractClientIp(req),
    };

    res.setHeader('x-request-id', requestId);
    asyncLocalStorage.run(store, next);
};

export const getRequestContext = () => asyncLocalStorage.getStore();
