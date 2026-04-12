import 'dotenv/config';

const toBoolean = (value, fallback = false) => {
    if (value === undefined || value === null || value === '') {
        return fallback;
    }

    return ['1', 'true', 'yes', 'on'].includes(String(value).trim().toLowerCase());
};

const toNumber = (value, fallback) => {
    const parsedValue = Number(value);
    return Number.isFinite(parsedValue) ? parsedValue : fallback;
};

const trimTrailingSlash = (value) => value.replace(/\/+$/, '');
const normalizeRedisConfig = (hostValue, portValue, passwordValue) => {
    const fallback = {
        host: hostValue?.trim() || '127.0.0.1',
        port: toNumber(portValue, 6379),
        password: passwordValue?.trim() || '',
        url: '',
    };

    if (!hostValue) {
        return fallback;
    }

    try {
        const parsedUrl = new URL(hostValue);
        if (!['redis:', 'rediss:'].includes(parsedUrl.protocol)) {
            return fallback;
        }

        return {
            host: parsedUrl.hostname || fallback.host,
            port: parsedUrl.port ? toNumber(parsedUrl.port, fallback.port) : fallback.port,
            password: passwordValue?.trim() || parsedUrl.password || '',
            url: hostValue.trim(),
        };
    } catch {
        return fallback;
    }
};

const environment = process.env.NODE_ENV?.trim() || 'development';
const serviceName = process.env.OTEL_SERVICE_NAME?.trim() || 'gemna-backend';
const serviceVersion = process.env.npm_package_version?.trim() || '1.0.0';
const backendUrl = process.env.BACKEND_URL?.trim() || 'http://localhost:3000';
const frontendUrl = process.env.FRONTEND_URL?.trim() || 'http://localhost:5173';
const databaseUrl = process.env.DATABASE_URL?.trim() || process.env.BATABASE_URL?.trim() || '';
const otelEndpointBase = trimTrailingSlash(
    process.env.OTEL_EXPORTER_OTLP_ENDPOINT?.trim() || 'http://localhost:4318'
);
const requestLogLevel = process.env.LOG_LEVEL?.trim() || (environment === 'production' ? 'info' : 'debug');
const redisConfig = normalizeRedisConfig(process.env.REDIS_HOST, process.env.REDIS_PORT, process.env.REDIS_PASS);

const requiredVariables = {
    JWT_SECURE: process.env.JWT_SECURE?.trim(),
    JSON_SECRET_KEY: process.env.JSON_SECRET_KEY?.trim(),
};

const missingRequiredVariables = Object.entries(requiredVariables)
    .filter(([, value]) => !value)
    .map(([key]) => key);

if (missingRequiredVariables.length > 0) {
    throw new Error(`Missing required environment variables: ${missingRequiredVariables.join(', ')}`);
}

export const env = {
    environment,
    isProduction: environment === 'production',
    isDevelopment: environment === 'development',
    port: toNumber(process.env.PORT, 3000),
    backendUrl,
    frontendUrl,
    serviceName,
    serviceVersion,
    logLevel: requestLogLevel,
    logDirectory: process.env.LOG_DIRECTORY?.trim() || 'logs',
    logMaxFiles: process.env.LOG_MAX_FILES?.trim() || '14d',
    logMaxSize: process.env.LOG_MAX_SIZE?.trim() || '20m',
    enableConsoleJsonLogs: toBoolean(process.env.LOG_CONSOLE_JSON, false),
    databaseUrl,
    jwtSecret: requiredVariables.JWT_SECURE,
    jsonSecretKey: requiredVariables.JSON_SECRET_KEY,
    cloudinary: {
        cloudName: process.env.CLOUD_NAME?.trim() || '',
        apiKey: process.env.CLOUD_API_KEY?.trim() || '',
        apiSecret: process.env.CLOUD_SECRET_KEY?.trim() || '',
    },
    redis: {
        host: redisConfig.host,
        port: redisConfig.port,
        password: redisConfig.password,
        url: redisConfig.url,
    },
    email: {
        name: process.env.NAME?.trim() || '',
        password: process.env.PASSWORD?.trim() || '',
    },
    queueName: process.env.QUEUE_NAME?.trim() || 'emailQueue',
    vercelKv: {
        url: process.env.VERCEL_URL_KV?.trim() || '',
        token: process.env.VERCEL_URL_KV_TOKEN?.trim() || '',
    },
    googleAuth: {
        clientId: process.env.GOOGLE_CLIENT_ID?.trim() || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET?.trim() || '',
    },
    inngest: {
        signingKey: process.env.INNGEST_SIGNING_KEY?.trim() || '',
        eventKey: process.env.INNGEST_EVENT_KEY?.trim() || '',
    },
    firebase: {
        projectId: process.env.FIREBASE_PROJECT_ID?.trim() || '',
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL?.trim() || '',
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
    },
    telemetry: {
        enabled: toBoolean(process.env.OTEL_ENABLED, false),
        tracesEnabled: toBoolean(process.env.OTEL_TRACES_ENABLED, true),
        metricsEnabled: toBoolean(process.env.OTEL_METRICS_ENABLED, true),
        endpointBase: otelEndpointBase,
        headers: process.env.OTEL_EXPORTER_OTLP_HEADERS?.trim() || '',
        tracesPath: process.env.OTEL_EXPORTER_OTLP_TRACES_PATH?.trim() || '/v1/traces',
        metricsPath: process.env.OTEL_EXPORTER_OTLP_METRICS_PATH?.trim() || '/v1/metrics',
        exportIntervalMs: toNumber(process.env.OTEL_METRIC_EXPORT_INTERVAL, 15000),
    },
};

export const getMissingOptionalEnv = () => {
    const optionalValues = [
        ['DATABASE_URL / BATABASE_URL', env.databaseUrl],
        ['GOOGLE_CLIENT_ID', env.googleAuth.clientId],
        ['GOOGLE_CLIENT_SECRET', env.googleAuth.clientSecret],
        ['INNGEST_EVENT_KEY', env.inngest.eventKey],
        ['FIREBASE_PROJECT_ID', env.firebase.projectId],
        ['FIREBASE_CLIENT_EMAIL', env.firebase.clientEmail],
        ['FIREBASE_PRIVATE_KEY', env.firebase.privateKey],
    ];

    return optionalValues.filter(([, value]) => !value).map(([key]) => key);
};
