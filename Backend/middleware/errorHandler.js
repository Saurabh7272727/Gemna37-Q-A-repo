import { logger } from '../observability/logger.js';

const envSafeMessage = (error, statusCode) => {
    if (statusCode < 500) {
        return error.message;
    }

    return 'Internal server error';
};

export const notFoundHandler = (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`,
    });
};

export const errorHandler = (error, req, res, next) => {
    logger.error('Unhandled application error', {
        message: error.message,
        stack: error.stack,
        method: req.method,
        path: req.originalUrl,
    });

    if (res.headersSent) {
        return next(error);
    }

    const statusCode = error.statusCode || error.status || 500;
    return res.status(statusCode).json({
        success: false,
        message: envSafeMessage(error, statusCode),
    });
};
