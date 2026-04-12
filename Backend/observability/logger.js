import fs from 'node:fs';
import path from 'node:path';
import { context, trace } from '@opentelemetry/api';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { env } from '../config/env.js';
import { getRequestContext } from './requestContext.js';

const { combine, timestamp, errors, json, colorize, printf } = winston.format;
const logDirectory = path.resolve(process.cwd(), env.logDirectory);

fs.mkdirSync(logDirectory, { recursive: true });

const sensitiveKeyPattern = /(authorization|password|secret|token|cookie|privatekey|api[-_]?key)/i;

const sanitizeValue = (value, key = '') => {
    if (value === null || value === undefined) {
        return value;
    }

    if (sensitiveKeyPattern.test(key)) {
        return '[REDACTED]';
    }

    if (Array.isArray(value)) {
        return value.map((entry) => sanitizeValue(entry));
    }

    if (value instanceof Error) {
        return {
            name: value.name,
            message: value.message,
            stack: value.stack,
        };
    }

    if (typeof value === 'object') {
        return Object.fromEntries(
            Object.entries(value).map(([nestedKey, nestedValue]) => [nestedKey, sanitizeValue(nestedValue, nestedKey)])
        );
    }

    return value;
};

const enrichLogFormat = winston.format((info) => {
    const requestContext = getRequestContext();
    const activeSpan = trace.getSpan(context.active());
    const spanContext = activeSpan?.spanContext();

    info.service = env.serviceName;
    info.environment = env.environment;

    if (requestContext) {
        info.requestId = info.requestId || requestContext.requestId;
        info.method = info.method || requestContext.method;
        info.path = info.path || requestContext.path;
        info.ip = info.ip || requestContext.ip;
    }

    if (spanContext) {
        info.traceId = info.traceId || spanContext.traceId;
        info.spanId = info.spanId || spanContext.spanId;
    }

    for (const [key, value] of Object.entries(info)) {
        info[key] = sanitizeValue(value, key);
    }

    return info;
});

const consoleFormat = combine(
    colorize(),
    timestamp(),
    errors({ stack: true }),
    enrichLogFormat(),
    printf(({ timestamp: time, level, message, requestId, method, path, traceId, ...meta }) => {
        const contextParts = [requestId, method, path, traceId].filter(Boolean);
        const metaString = Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : '';
        return `${time} ${level}: ${message}${contextParts.length > 0 ? ` [${contextParts.join(' | ')}]` : ''}${metaString}`;
    })
);

const fileFormat = combine(
    timestamp(),
    errors({ stack: true }),
    enrichLogFormat(),
    json()
);

const transports = [
    new winston.transports.Console({
        level: env.logLevel,
        format: env.enableConsoleJsonLogs ? fileFormat : consoleFormat,
    }),
    new DailyRotateFile({
        dirname: logDirectory,
        filename: 'application-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        maxSize: env.logMaxSize,
        maxFiles: env.logMaxFiles,
        level: env.logLevel,
        format: fileFormat,
    }),
    new DailyRotateFile({
        dirname: logDirectory,
        filename: 'error-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        maxSize: env.logMaxSize,
        maxFiles: env.logMaxFiles,
        level: 'error',
        format: fileFormat,
    }),
];

export const logger = winston.createLogger({
    level: env.logLevel,
    defaultMeta: {
        service: env.serviceName,
        environment: env.environment,
    },
    transports,
    exitOnError: false,
});
