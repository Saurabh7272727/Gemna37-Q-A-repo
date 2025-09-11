import app from "./app.js";
import http from 'http';
import dotenv from 'dotenv';

dotenv.config()

const server = http.createServer(app);

try {
    server.listen(process.env.PORT, () => {
        console.log(`server are listen on http://localhost:${process.env.PORT}`)
    })
} catch (error) {
    console.log(`error in server.js file=> ${error} `)
}

