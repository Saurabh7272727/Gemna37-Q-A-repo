import { Server } from 'socket.io';
import AuthBYSocket from './AuthBYSocket.js';
import connectionModel from '../model/connection.model.js';
import messagemodel from '../model/message.model.js';
import { acceptOfflineMessages } from '../service/NotificationSystem/offlineFeature.js';
import { SocketSingleton } from '../module/socket.signleton.js'
import { env } from '../config/env.js';
import { logger } from '../observability/logger.js';


const connectWithSocket = (server) => {
    try {
        const io = new Server(server, {
            cors: {
                origin: [
                    "http://localhost:5173", env.frontendUrl
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
                return next(err);
            }
            const verify = await AuthBYSocket(token);
            if (verify.success) {
                socket.user = verify.findUser;
                return next()
            } else {
                const err = new Error("User are not valid");
                return next(err);
            }
        });

        // chating module ........
        const socketSingleton = new SocketSingleton(io);
        io.on("connection", async (socket) => {
            // using singleton method - addUser(user details, socket id)
            if (socket.id && socket.user) {
                const permission_to_add = await socketSingleton.addUser(socket.user, socket.id);
                if (permission_to_add) {
                    await socket.join(`${socket?.user?.ref_id?.branch?.value}/${socket?.user?.ref_id?.year?.value}`)
                    const localdata = await socketSingleton.getAllOnlineUser(`${socket.user?.ref_id.course.value}${socket.user?.ref_id.branch.value}${socket.user?.ref_id.year.value}`);
                    io.to(`${socket?.user?.ref_id?.branch?.value}/${socket?.user?.ref_id?.year?.value}`).emit(
                        'newUserAreConnect', { onlineUsers: [...localdata] }
                    );
                } else {
                    socket.emit('process-error-501', {
                        message: "something was wrong!",
                        submessage: "try to reload and sure about connectivity and to check login or not",
                        success: false,
                    });

                    return;
                }
            } else {
                return;
            }

            socket.on('socket_send_payload', async (data, callback) => {
                const { senderId, receiverId, message, index, socketId, type, r_email, language } = data;
                const authenticatedSenderId = String(socket.user?.ref_id?._id || '');

                if (!senderId || String(senderId) !== authenticatedSenderId) {
                    logger.warn('Blocked socket message with mismatched sender', {
                        senderId,
                        authenticatedSenderId,
                    });
                    return callback({ notify: 'sender validation failed' });
                }

                const findKey = await socketSingleton.getSocketID(r_email?.trim());
                if (findKey.length > 0 && Array.isArray(findKey)) {
                    const findConnectionfirst = await connectionModel.findOne({ id: `${senderId}/${receiverId}` });
                    const findConnectionSecond = await connectionModel.findOne({ id: `${receiverId}/${senderId}` });
                    if (findConnectionfirst) {
                        const messagePayload = {
                            type,
                            senderId,
                            receiverId,
                            message: message,
                            saveID: true,
                            language
                        };
                        const savedataMessage = new messagemodel(messagePayload);
                        await savedataMessage.save();
                        findConnectionfirst.messages.push({ ref_id: savedataMessage._id });
                        await findConnectionfirst.save();

                        for (let key of findKey) {
                            io.to(key).emit("notification_new_message", { notify: "you receive new message", index, message: savedataMessage, distination: `${receiverId}/${senderId}`, chatID: findConnectionfirst?._id, senderId })
                        }

                        callback({ notify: "successfully send your message", index, message: savedataMessage, distination: `${senderId}/${receiverId}` });
                    } else if (findConnectionSecond) {
                        const messagePayload = {
                            type,
                            senderId,
                            receiverId,
                            message,
                            saveID: true,
                            language
                        };

                        const savedataMessage = new messagemodel(messagePayload);
                        const instanceMessage = await savedataMessage.save();
                        findConnectionSecond.messages.push({ ref_id: instanceMessage._id });
                        await findConnectionSecond.save();

                        for (let key of findKey) {
                            io.to(key).emit("notification_new_message", {
                                notify: "you receive new message", index, message: savedataMessage,
                                distination: `${receiverId}/${senderId}`, chatID: findConnectionSecond?._id, senderId
                            })
                        }

                        callback({ notify: "successfully send your message", index, message: savedataMessage, distination: `${senderId}/${receiverId}` });
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
                            saveID: true,
                            language
                        };
                        const savedataMessage = new messagemodel(messagePayload);
                        const instanceMessage = await savedataMessage.save();
                        createNewConnection.messages.push({ ref_id: instanceMessage._id });
                        await createNewConnection.save();

                        for (let key of findKey) {
                            io.to(key).emit("notification_new_message", {
                                notify: "you receive new message (new connection)",
                                index, message: savedataMessage,
                                distination: `${senderId}/${receiverId}`,
                                chatID: createNewConnection?._id, senderId
                            })
                        }

                        callback({ notify: "successfully send your message first time", index, message: savedataMessage, distination: `${senderId}/${receiverId}`, senderId, receiverId });
                    }
                } else {
                    callback({ notify: "something was wrong , don't send any message" });
                }
            })

            socket.on('socket_send_payload_offline_user', async (data, callback) => {
                // callback - function make action on sender device, data = payload
                try {
                    const response = await acceptOfflineMessages(data);
                    callback(response);
                } catch (error) {
                    logger.error('Offline socket message handler failed', { message: error.message });
                    callback({ notify: "something was wrong , don't send any message" });
                }
            })

            socket.on('user_typing', ({ socketId, email }) => {
                io.to(socketId).emit('receive_user_typing', { mode: "typing", email })
            })

            socket.on('user_typing_off', ({ socketId, email }) => {
                io.to(socketId).emit('receive_user_typing_off', { mode: "stop_typing", email });
            })

            socket.on('disconnect', async (reason) => {
                logger.info('Socket disconnected', {
                    socketId: socket.id,
                    reason,
                    userId: String(socket?.user?.ref_id?._id || ''),
                });
                const permission_to_delete = await socketSingleton.deleteUser(socket?.user?.ref_id.email, socket.id, socket?.user)
                if (permission_to_delete) {
                    const localdata = await socketSingleton.getAllOnlineUser(`${socket.user?.ref_id.course.value}${socket.user?.ref_id.branch.value}${socket.user?.ref_id.year.value}`);
                    io.to(`${socket?.user?.ref_id?.branch?.value}/${socket?.user?.ref_id?.year?.value}`).emit(
                        'userAreDisconnect', { onlineUsers: [...localdata] }
                    )
                }
            })
        });

        return io;
    } catch (error) {
        logger.error('Socket server bootstrap failed', { message: error.message });
        throw new Error(`Error-socket.io  ${error}`)
    }
}

export default connectWithSocket;
