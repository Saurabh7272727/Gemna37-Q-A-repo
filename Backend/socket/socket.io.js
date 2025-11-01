import { Server } from 'socket.io';
import AuthBYSocket from './AuthBYSocket.js';
import kv from '../utils/vercel.KV.js';
import connectionModel from '../model/connection.model.js';
import messagemodel from '../model/message.model.js';



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
            );


            socket.on('socket_send_payload', async (data, callback) => {
                const { senderId, receiverId, message, index, socketId, type, r_email } = data;
                const findKey = [...tempStorage].reduce((acum, item) => {
                    if (item[1].email.trim() == r_email.trim()) {
                        acum = item[0];
                    };

                    return acum;
                }, null)

                if (findKey) {
                    const findConnectionfirst = await connectionModel.findOne({ id: `${senderId}/${receiverId}` });
                    const findConnectionSecond = await connectionModel.findOne({ id: `${receiverId}/${senderId}` });
                    if (findConnectionfirst) {
                        const messagePayload = {
                            type,
                            senderId,
                            receiverId,
                            message: message,
                            saveID: true
                        };
                        const savedataMessage = new messagemodel(messagePayload);
                        await savedataMessage.save();
                        findConnectionfirst.messages.push({ ref_id: savedataMessage._id });
                        await findConnectionfirst.save();
                        io.to(findKey).emit("notification_new_message", { notify: "you receive new message", index, message: savedataMessage, distination: `${receiverId}/${senderId}` })
                        callback({ notify: "successfully send your message", index, message: savedataMessage, distination: `${receiverId}/${senderId}` });
                    } else if (findConnectionSecond) {
                        const messagePayload = {
                            type,
                            senderId,
                            receiverId,
                            message,
                            saveID: true
                        };

                        const savedataMessage = new messagemodel(messagePayload);
                        const instanceMessage = await savedataMessage.save();
                        findConnectionSecond.messages.push({ ref_id: instanceMessage._id });
                        await findConnectionSecond.save();
                        io.to(findKey).emit("notification_new_message", { notify: "you receive new message", index, message: savedataMessage, distination: `${receiverId}/${senderId}` })
                        callback({ notify: "successfully send your message", index, message: savedataMessage, distination: `${receiverId}/${senderId}` });
                    } else {
                        const createNewConnection = new connectionModel({
                            type: "direct",
                            id: `${senderId}/${receiverId}`,
                            member_one: senderId,
                            member_two: receiverId,
                        });
                        const messagePayload = {
                            type,
                            senderId,
                            receiverId,
                            message,
                            saveID: true
                        };
                        const savedataMessage = new messagemodel(messagePayload);
                        const instanceMessage = await savedataMessage.save();
                        createNewConnection.messages.push({ ref_id: instanceMessage._id });
                        await createNewConnection.save();
                        io.to(findKey).emit("notification_new_message", { notify: "you receive new message", index, message: savedataMessage, distination: `${receiverId}/${senderId}` })
                        callback({ notify: "successfully send your message", index, message: savedataMessage, distination: `${receiverId}/${senderId}` });
                    }
                } else {
                    callback({ notify: "something was wrong , don't send any message" });
                }
            })

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
