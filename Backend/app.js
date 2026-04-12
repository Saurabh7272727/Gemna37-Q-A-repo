import express from 'express';
import path from "path";
import studentUploadRouter from './Route/student.upload.image.js';
import VerifyedStudentFetchRouter from './Route/student.fetchdata.router.js';
import googleVerificationRouter from './Route/student.auth.google.js';
import cors from 'cors';
import initialresponseonhomeroute from './ResponseStructure/initialResponse.js';
import cookieParser from 'cookie-parser';
import serve_inngest from './service/Inngest/handlerFile.js';
import helmet from 'helmet'
import { env } from './config/env.js';
import { requestContextMiddleware } from './observability/requestContext.js';
import { httpLoggerMiddleware } from './observability/httpLogger.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import systemRouter from './Route/system.routes.js';

// Attendance-Core
import subjectRouter from './Route/AttendanceCore/subject.route.js';
import homeController from './Route/AttendanceCore/home.route.js';
const app = express();


app.disable('x-powered-by');
app.use(helmet());
app.use(cookieParser());
app.use(requestContextMiddleware);
app.use(httpLoggerMiddleware);
app.use(cors({
    origin: [env.frontendUrl],
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use("/files", express.static(path.join(process.cwd(), "public")));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", env.frontendUrl);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/system', systemRouter);
app.use("/api/inngest", serve_inngest);
app.get('/', (req, res) => {
    const response = new initialresponseonhomeroute('welcome to gemna home route', 200, true);
    response.initialResponse(req, res);
})

app.use('/student', studentUploadRouter);
app.use('/api/v1/students', VerifyedStudentFetchRouter);
app.use('/', googleVerificationRouter);

app.use('/api/attendance', homeController);
app.use('/api/subject', subjectRouter)
app.use(notFoundHandler);
app.use(errorHandler);
export default app;
