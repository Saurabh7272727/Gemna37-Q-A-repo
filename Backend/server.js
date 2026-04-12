import http from 'http';
import connectWithSocket from './socket/socket.io.js';
import { env, getMissingOptionalEnv } from './config/env.js';
import { logger } from './observability/logger.js';
import { shutdownTelemetry, startTelemetry } from './observability/telemetry.js';
import connectDataBaseURL from './service/db.js';
// main logical file --- gemna.ai server (we use two server same repo on - vercel and render for diff purpose)

await startTelemetry();
await connectDataBaseURL();
const { default: app } = await import('./app.js');

const server = http.createServer(app);

connectWithSocket(server);

const optionalEnvGaps = getMissingOptionalEnv();
if (optionalEnvGaps.length > 0) {
    logger.warn('Optional environment variables are missing for some integrations', {
        missingVariables: optionalEnvGaps,
    });
}

server.listen(env.port, () => {
    logger.info('Server is listening', {
        port: env.port,
        backendUrl: env.backendUrl,
    });
});

server.on('error', (error) => {
    logger.error('HTTP server error', { message: error.message, stack: error.stack });
});

const gracefulShutdown = async (signal) => {
    logger.warn('Graceful shutdown requested', { signal });

    server.close(async (serverError) => {
        if (serverError) {
            logger.error('Server close failed', { message: serverError.message });
            process.exit(1);
        }

        try {
            await shutdownTelemetry();
            process.exit(0);
        } catch (error) {
            logger.error('Telemetry shutdown failed', { message: error.message });
            process.exit(1);
        }
    });
};

process.on('SIGINT', () => {
    gracefulShutdown('SIGINT');
});

process.on('SIGTERM', () => {
    gracefulShutdown('SIGTERM');
});

process.on('uncaughtException', (error) => {
    logger.error('Uncaught exception', { message: error.message, stack: error.stack });
});

process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled promise rejection', {
        reason: reason instanceof Error ? { message: reason.message, stack: reason.stack } : reason,
    });
});

