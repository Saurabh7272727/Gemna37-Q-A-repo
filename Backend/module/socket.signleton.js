
import { z } from "zod";
import redis from '../service/Redis/Client.js';

const optionSchema = z.object({
    value: z.string(),
    label: z.string()
});

const studentSchema = z.object({
    course: optionSchema,
    branch: optionSchema,
    year: optionSchema,
    status: optionSchema,

    _id: z.any(), // temp fix

    firstName: z.string(),
    lastName: z.string(),

    fatherName: z.string(),
    motherName: z.string(),

    emailAreSendStatus: z.string(), // relaxed

    email: z.string().email(),

    rollNumber: z.string(),
    GEMID: z.string(),
    collegeID: z.string(),

    Indb: z.boolean(),

    createdAt: z.union([z.date(), z.string()]),
    updatedAt: z.union([z.date(), z.string()]),

    __v: z.number(),

    imageURL: z.string().optional()
}).passthrough();


class SocketSingleton {
    constructor(io) {
        if (SocketSingleton.instance) {
            return SocketSingleton.instance;
        }

        this.io = io;
        SocketSingleton.instance = Object.freeze(this);
    }


    async addUser(user = undefined, socket_id = undefined) {
        if (!user || !socket_id) {
            throw new Error("user details and socket id are missing in addUser method(SocketSingleton)")
        }

        if (user?.ref_id) {
            const testObject = studentSchema.safeParse(user?.ref_id);

            if (!testObject.success) {
                return null;
            }

            try {
                const key = `online${testObject?.data.course.value}${testObject?.data.branch.value}${testObject?.data.year.value}:${testObject.data.email}`;
                const exists = await redis.exists(key);
                if (exists) {
                    await redis.sadd(`socketlog:${testObject.data.email}`, socket_id);
                    return true;
                }
                const payload = {
                    email: testObject.data.email,
                    imageURL: testObject.data.imageURL,
                    firstName: testObject.data.firstName,
                    lastName: testObject.data.lastName,
                    collegeID: testObject.data.collegeID,
                    Indb: String(testObject.data.Indb),
                    socketId: socket_id,
                    _id: testObject.data._id
                };
                await redis.hset(key, payload);
                await redis.sadd(`branch${testObject?.data.course.value}${testObject?.data.branch.value}${testObject?.data.year.value}:gemna`, testObject.data.email);
                await redis.sadd(`socketlog:${testObject.data.email}`, socket_id);
                return true;
            } catch (error) {
                console.log("Error addUser ======================>", error);
                return null;
            }
        }
    }


    async deleteUser(email = null, socket_id = null, user) {
        if (!email || !socket_id) {
            throw new Error("email & socket_id required");
        }

        try {
            const userKey = `online${user?.ref_id.course.value}${user?.ref_id.branch.value}${user?.ref_id.year.value}:${email}`;
            const socketKey = `socketlog:${email}`;
            await redis.srem(socketKey, socket_id);
            const remaining = await redis.scard(socketKey);
            if (remaining === 0) {
                //No active sockets → delete everything
                await redis.srem(`branch${user?.ref_id.course.value}${user?.ref_id.branch.value}${user?.ref_id.year.value}:gemna`, email);
                await redis.del(userKey);
                await redis.del(socketKey);
            }
            return true;
        } catch (error) {
            console.log("Error deleteUser ======================>", error);
            return null;
        }
    }

    async getAllOnlineUser(group) {
        if (!group) {
            throw new Error("group are required");
        }
        // Function - Return the user those are online and have same branch/year/course means 3 field have same values
        try {
            const users = await redis.smembers(`branch${group}:gemna`);
            const result = []
            for (let email of users) {
                const user = await redis.hgetall(`online${group}:${email}`);
                result.push(user);
            }
            return result ? [...result] : [];
        } catch (error) {
            return [];
        }
    }

    async getSocketID(email) {

        if (!email) {
            throw new Error("email are required to find all sockets id's connections");
        }
        const socketKey = `socketlog:${email}`;
        try {
            const sockets = await redis.smembers(`${socketKey}`);
            return sockets ? [...sockets] : []
        } catch (error) {
            return []
        }
    }
}



export { SocketSingleton, studentSchema };