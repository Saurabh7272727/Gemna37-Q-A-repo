import * as z from "zod";
import StudentAttendanceModel from "../../model/Attendence_Section/StudentAttendenceModel.js";
import { encryptData, decryptData } from "../../components/crypto.js";

// redis import
import redis from "../../service/Redis/Client.js";


const objPayloadVerification = z.object({
    gemidlog: z.string().length(24).regex(/^[a-f\d]{24}$/i),
    timestamp: z.string()
});

const homeController = async (req, res) => {
    const { gemidlog, timestamp, sessionToken } = req.body;
    try {

        // Validation of Payload => body part

        const parsed = objPayloadVerification.safeParse({ gemidlog, timestamp });
        if (!parsed.success) {
            return res.status(404).json({
                status: 404,
                message: parsed.error,
                success: false
            });
        }
        req.body = parsed.data;

        const findUserInAttendanceRecord = await StudentAttendanceModel.findOne({ gemidlog });

        if (findUserInAttendanceRecord) {
            res.status(200).json({
                message: "User found in attendance record",
                status: 200,
                success: false,
                sessionToken: encryptData({
                    gemidlog,
                    expiration: Date.now(),
                    permission: {
                        role: "Student",
                        update: true,
                        upload: true,
                        admin: false,
                        routePermission: true
                    }
                })
            });
            return;
        }

        // check user are exist or not in redis session group
        const redisResponseSessionExist = await redis.hgetall(`session:${gemidlog}`);

        // if not exist to allowed for session
        if (Object.keys(redisResponseSessionExist).length === 0 && !sessionToken) {
            const hashSetInRedis = await redis.hset(
                `session:${gemidlog}`,
                {
                    'gemidlog': `${gemidlog}`,
                    'attend': 1,
                    'expiration': `${Date.now()}`,
                }
            );

            // set expiration 300seconds = 5min
            await redis.expire(`session:${gemidlog}`, 300);

            if (hashSetInRedis === 3) {
                const getValueFromRedis = await redis.hgetall(`session:${gemidlog}`);
                res.status(202).json({
                    message: "User not found but session allowed",
                    status: 202,
                    success: false,
                    sessionToken: encryptData(getValueFromRedis)
                });
                return;
            } else {
                throw new Error(`${hashSetInRedis} : will not equal to 3`)
            }

        } else {
            // there validate if user have session id and range of redis expiration
            if (sessionToken) {
                // decrypt the sessionToken
                let decryptDataSessionToken;
                try {
                    decryptDataSessionToken = decryptData(sessionToken);
                } catch {
                    return res.status(401).json({
                        message: "Invalid session token",
                        success: false,
                        status: 401
                    });
                }

                // if not present gemidlog field and expiration time
                if (!decryptDataSessionToken.gemidlog && !decryptDataSessionToken?.expiration) {
                    throw new Error("session token are invaild format , this not acceptable format..")
                }

                // if present the check in redis to present or not same session group with gemidlog
                const { gemidlog } = decryptDataSessionToken
                let redisResponseSessionExist = await redis.hgetall(`session:${gemidlog}`);

                if (Object.keys(redisResponseSessionExist).length === 0) {
                    throw new Error("Session will be expired, try again")
                }

                const incrementTheAttend = await redis.hincrby(`session:${gemidlog}`, 'attend', 1);
                redisResponseSessionExist = await redis.hgetall(`session:${gemidlog}`);

                // check time exseed
                if (redisResponseSessionExist?.attend < 5 && (Date.now() - Number(redisResponseSessionExist?.expiration) < 5 * 60 * 1000) && incrementTheAttend < 5) {
                    res.status(202).json({
                        message: "User session are rotated with allocate a new session",
                        status: 202,
                        success: false,
                        sessionToken: encryptData(redisResponseSessionExist)
                    });
                    return;
                } else {
                    res.status(429).json({
                        message: "Too many request for session , you try again in after 5 mins",
                        status: 429,
                        success: false,
                    });
                    return;
                }

            }
        }

        if (redisResponseSessionExist.gemidlog && redisResponseSessionExist?.expiration) {
            res.status(409).json({
                message: "Session will be send already, duplication are not allowed",
                status: 409,
                success: false,
            });
            return;
        }

    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: 500,
            success: false
        });
        return;
    }

};

const unmountController = async (req, res) => {
    res.end();
}

export default { homeController, unmountController };
