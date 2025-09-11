import express from 'express';
import studentUploadRouter from './Route/student.upload.image.js';
import cors from 'cors';
import initialresponseonhomeroute from './ResponseStructure/initialResponse.js';
import morgan from 'morgan';
const app = express();


app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(cors({
    origin: "*",
    methods: ["POST", "GET"],
    credentials: true
}));


app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.get('/', (req, res) => {
    const response = new initialresponseonhomeroute('welcome to gemna home route', 200, true);
    response.initialResponse(req, res);
})


app.use('/student', studentUploadRouter)

export default app;