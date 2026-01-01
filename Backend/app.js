import express from 'express';
import studentUploadRouter from './Route/student.upload.image.js';
import VerifyedStudentFetchRouter from './Route/student.fetchdata.router.js';
import googleVerificationRouter from './Route/student.auth.google.js';

import cors from 'cors';
import initialresponseonhomeroute from './ResponseStructure/initialResponse.js';
import morgan from 'morgan';
import connectDataBaseURL from './service/db.js';
import cookieParser from 'cookie-parser';
import serve_inngest from './service/Inngest/handlerFile.js';
import helmet from 'helmet'
const app = express();


connectDataBaseURL();
app.use(helmet());
app.use(cookieParser());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(cors({
    origin: ["http://localhost:5173", "https://gemnaworld.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));


app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use("/api/inngest", serve_inngest);
app.get('/', (req, res) => {
    const response = new initialresponseonhomeroute('welcome to gemna home route', 200, true);
    response.initialResponse(req, res);
})


app.use('/student', studentUploadRouter);
app.use('/api/v1/students', VerifyedStudentFetchRouter);
app.use('/', googleVerificationRouter)
export default app;