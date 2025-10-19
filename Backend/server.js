import app from "./app.js";
import http from 'http';
import dotenv from 'dotenv';

dotenv.config()

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

try {
    server.listen(PORT, () => {
        console.log(`server are listen on http://localhost:${PORT}`)
    })
} catch (error) {
    console.log(`error in server.js file=> ${error} `)
}

