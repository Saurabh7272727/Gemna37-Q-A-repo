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
            transports: ['websocket', 'polling']
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

            // ✅ KV Storage mein bhi store karo (without JSON.stringify)
            const userKey = `socket:${socket.id}`;
            const roomKey = `${socket?.user?.ref_id?.branch?.value}/${socket?.user?.ref_id?.year?.value}`;

            await kv.set(userKey, {
                user: socket.user,
                socketId: socket.id,
                room: roomKey,
                connectedAt: Date.now()
            });

            // Online users set mein add karo
            await kv.sadd('online_sockets', socket.id);

            // Room join karo
            await socket.join(roomKey);

            // ✅ Tera original logic - tempStorage se hi online users bhejo
            io.to(roomKey).emit(
                'newUserAreConnect', { onlineUsers: [...tempStorage] }
            )

            socket.on('disconnect', (reason) => {
                console.log(`${socket.id} are disconnect ${reason}`);
                tempStorage.delete(socket.id);

                // ✅ Tera original logic - tempStorage se hi online users bhejo
                io.to(`${socket?.user?.ref_id?.branch?.value}/${socket?.user?.ref_id?.year?.value}`).emit(
                    'userAreDisconnect', { onlineUsers: [...tempStorage] }
                )

                // ✅ KV se bhi remove karo (background mein)
                kv.del(userKey).catch(console.error);
                kv.srem('online_sockets', socket.id).catch(console.error);
            });
        });

        console.log("socket.io are connected with geman.ai");
        return io;
    } catch (error) {
        throw new Error(`Error-socket.io  ${error}`)
    }
}

export default connectWithSocket;