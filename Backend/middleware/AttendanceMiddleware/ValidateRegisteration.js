
import { decryptData } from '../../components/crypto.js';
import * as z from "zod";
import redis from "../../service/Redis/Client.js";

const checkSessionTokenByZod = z.object({
    gemidlog: z.string().length(24).regex(/^[a-f\d]{24}$/i),
    attend: z.number().int().min(1).max(5),
    expiration: z.number().int()
}).strict();

const isPlainObject = (payload) => {
    return (
        payload !== null &&
        typeof payload === "object" &&
        !Array.isArray(payload)
    );
};

const ValidateRegistrationUser = async (req, res, next) => {

    const bodyData = req?.body;

    if (bodyData == undefined || bodyData == null) {
        return res.status(404).json({
            message: 'Payload are missing in body , body have undefined or null values',
            status: 404,
            success: false
        })
    }

    try {
        if (Object.keys(bodyData).length !== 2) {
            throw new Error("Invalid request body structure");
        }
        const { sessionToken, payload } = req.body;


        if (!isPlainObject(payload)) {
            throw new Error("Invalid payload : session will be end.., payload is not object");
        }

        if (!sessionToken || Object.keys(payload).length !== 6) {
            throw new Error("Invalid payload : session will be end..");
        }

        const sessionData = decryptData(sessionToken);
        sessionData.attend = Number(sessionData.attend);
        sessionData.expiration = Number(sessionData.expiration);

        if (isNaN(sessionData.attend) || isNaN(sessionData.expiration)) {
            throw new Error("Attend is string , expected number or expiration");
        }
        const parsed = checkSessionTokenByZod.safeParse(sessionData);
        if (!parsed.success) {
            return res.status(404).json({
                status: 404,
                message: JSON.parse(parsed.error.message),
                success: false
            });
        }

        const { gemidlog } = parsed.data;
        const redisResponseSessionExist = await redis.hgetall(`session:${gemidlog}`);
        if (
            Object.keys(redisResponseSessionExist).length === 0 ||
            (Date.now() - Number(redisResponseSessionExist.expiration)) > 5 * 60 * 1000
        ) {
            throw new Error("Session expired, try again after 5min later");
        }


        next();
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: 500,
            success: false
        })
    }

}



export default ValidateRegistrationUser;