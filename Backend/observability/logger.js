import fs from 'node:fs';
import path from 'node:path';
import { context, trace } from '@opentelemetry/api';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { env } from '../config/env.js';
import { getRequestContext } from './requestContext.js';

const { combine, timestamp, errors, json, colorize, printf } = winston.format;

const platform = env.plateform?.toLowerCase();

const isLocal = platform === 'localhost';
const isRender = platform === 'render';
const isVercel = platform === 'vercel';

const enableFileLogging = isLocal || isRender;

const logDirectory = path.resolve(process.cwd(), env.logDirectory);

if (enableFileLogging) {
    fs.mkdirSync(logDirectory, { recursive: true });
}

const sensitiveKeyPattern = /(authorization|password|secret|token|cookie|privatekey|api[-_]?key)/i;

const sanitizeValue = (value, key = '') => {
    if (value === null || value === undefined) return value;

    if (sensitiveKeyPattern.test(key)) return '[REDACTED]';

    if (Array.isArray(value)) return value.map((entry) => sanitizeValue(entry));

    if (value instanceof Error) {
        return {
            name: value.name,
            message: value.message,
            stack: value.stack,
        };
    }

    if (typeof value === 'object') {
        return Object.fromEntries(
            Object.entries(value).map(([k, v]) => [k, sanitizeValue(v, k)])
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
        const ctx = [requestId, method, path, traceId].filter(Boolean);
        const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
        return `${time} ${level}: ${message}${ctx.length ? ` [${ctx.join(' | ')}]` : ''}${metaStr}`;
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
];

if (enableFileLogging) {
    transports.push(
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
        })
    );
}

export const logger = winston.createLogger({
    level: env.logLevel,
    defaultMeta: {
        service: env.serviceName,
        environment: env.environment,
    },
    transports,
    exitOnError: false,
});