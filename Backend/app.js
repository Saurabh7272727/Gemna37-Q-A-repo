import express from 'express';
import studentUploadRouter from './Route/student.upload.image.js';
import cors from 'cors';
import initialresponseonhomeroute from './ResponseStructure/initialResponse.js';
import morgan from 'morgan';
import connectDataBaseURL from './service/db.js';
import cookieParser from 'cookie-parser';
const app = express();


connectDataBaseURL();
app.use(cookieParser());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(cors({
    origin: ["http://localhost:5173", "https://gemna37-q-a-repo.vercel.app/"],
    methods: ["POST", "GET"],
    credentials: true
}));


app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.get('/', (req, res) => {
    const response = new initialresponseonhomeroute('welcome to gemna home route', 200, true);
    response.initialResponse(req, res);
})


app.use('/student', studentUploadRouter);

export default app;