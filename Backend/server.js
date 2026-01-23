import app from "./app.js";
import http from 'http';
import dotenv from 'dotenv';
import connectWithSocket from './socket/socket.io.js';
// main logical file --- gemna.ai server (we use two server same repo on - vercel and render for diff purpose)


dotenv.config()

const server = http.createServer(app);
try {
    connectWithSocket(server);

} catch (error) {
    console.log(error.message);
}
const PORT = process.env.PORT || 3000;
try {
    server.listen(PORT, () => {
        console.log(`server are listen on http://localhost:${PORT}`)
    })
} catch (error) {
    console.log(`error in server.js file=> ${error} `)
}

