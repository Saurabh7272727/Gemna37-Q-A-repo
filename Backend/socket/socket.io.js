import { Server } from 'socket.io';
import AuthBYSocket from './AuthBYSocket.js';
import kv from '../utils/vercel.KV.js';

const tempStorage = new Map();



const connectWithSocket = (server) => {
    try {
        const io = new Server(server, {
            cors: {
                origin: [
                    "http://localhost:5173", process.env.FRONTEND_URL
                ],
                methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
                credentials: true,
                allowedHeaders: ["Content-Type", "Authorization"]
            },
            transports: ['websocket', 'polling'],
            allowEIO3: true,
            connectionStateRecovery: {
                maxDisconnectionDuration: 2 * 60 * 1000, // 2 minutes
                skipMiddlewares: true,
            }
        });


        io.use(async (socket, next) => {
            const token = socket.handshake.auth.token;
            if (!token || token == null || token == undefined) {
                const err = new Error("User are not valid");
                next(err);
            }
            const verify = await AuthBYSocket(token);
            if (verify.success) {
                socket.user = verify.findUser;
                next()
            } else {
                const err = new Error("User are not valid");
                next(err);
            }
        });

        io.on("connection", async (socket) => {
            console.log(`user info ${socket.id}`);
            tempStorage.set(socket.id, socket.user);

            await socket.join(`${socket?.user?.ref_id?.branch?.value}/${socket?.user?.ref_id?.year?.value}`)


            io.to(`${socket?.user?.ref_id?.branch?.value}/${socket?.user?.ref_id?.year?.value}`).emit(
                'newUserAreConnect', { onlineUsers: [...tempStorage] }
            )

            socket.on('disconnect', (reason) => {
                console.log(`${socket.id} are disconnect ${reason}`);
                tempStorage.delete(socket.id);

                io.to(`${socket?.user?.ref_id?.branch?.value}/${socket?.user?.ref_id?.year?.value}`).emit(
                    'userAreDisconnect', { onlineUsers: [...tempStorage] }
                )
            })
        });



        console.log("socket.io are connected with geman.ai");
        return io;
    } catch (error) {
        throw new Error(`Error-socket.io  ${error}`)
    }
}

export default connectWithSocket;
