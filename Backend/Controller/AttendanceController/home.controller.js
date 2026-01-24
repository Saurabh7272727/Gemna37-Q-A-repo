import * as z from "zod";
import StudentAttendanceModel from "../../model/Attendence_Section/StudentAttendenceModel.js";
import jwt from "jsonwebtoken";
import { encryptData } from "../../components/crypto.js";

const mapHoldRecordRunning = new Map();

const objPayloadVerification = z.object({
    gemidlog: z.string().length(24).regex(/^[a-f\d]{24}$/i),
    timestamp: z.number()
});

const homeController = async (req, res) => {
    const { gemidlog } = req.body;

    try {
        const parsed = objPayloadVerification.safeParse(req.body);

        if (!parsed.success) {
            return res.status(404).json({
                status: 404,
                message: parsed.error,
                success: false
            });
        }

        req.body = parsed.data;
        const findUserByGemidlog = await StudentAttendanceModel.findOne({ gemidlog });

        /* ========================================================
           CASE 1: USER NOT FOUND + SESSION ALREADY RUNNING
        ======================================================== */
        if (!findUserByGemidlog && mapHoldRecordRunning.has(gemidlog)) {
            const valueAttend = mapHoldRecordRunning.get(gemidlog);

            if (valueAttend.attend > 5) {
                return res.status(429).json({
                    status: 429,
                    message: `${valueAttend.attend} : you limit the process count`,
                    success: false
                });
            }

            mapHoldRecordRunning.set(gemidlog, {
                gemidlog,
                attend: valueAttend.attend + 1
            });

            return res.status(409).json({
                status: 409,
                message: "You already opened the session window in another tab or browser",
                success: false
            });
        }


        if (!findUserByGemidlog && !mapHoldRecordRunning.has(gemidlog)) {
            mapHoldRecordRunning.set(gemidlog, {
                gemidlog,
                attend: 1
            });

            const sessionToken = {
                gemidlog,
                timestamp: Date.now(),
                expiresIn: '10m'
            }

            //     jwt.sign(
            //     { gemidlog, timestamp: Date.now() },
            //     process.env.JSON_SECRET_KEY,
            //     { expiresIn: "10m" }
            // );

            return res.status(202).json({
                status: 202,
                message: "User not found in record",
                success: true,
                sessionToken: encryptData(sessionToken)
            });
        }

        if (findUserByGemidlog?.gemidlog) {
            const sessionToken = jwt.sign(
                { gemidlog, timestamp: Date.now() },
                process.env.JSON_SECRET_KEY,
                { expiresIn: "24h" }
            );

            return res.status(200).json({
                status: 200,
                message: "Verification successfully completed",
                success: true,
                sessionToken: encryptData(sessionToken)
            });
        }


        throw new Error("Internal server error - homeController");

    } catch (error) {
        console.error("ERROR ======>", error);

        if (gemidlog) {
            mapHoldRecordRunning.delete(gemidlog);
        }

        return res.status(500).json({
            status: 505,
            message: "Internal server error",
            success: false
        });
    }
};

const unmountController = async (req, res) => {
    try {
        const data = req.body;
        const { _id } = data;
        if (_id) {
            if (mapHoldRecordRunning.has(`${_id}`)) {
                mapHoldRecordRunning.delete(`${_id}`);
            }
        }
        return res.end();
    } catch (error) {
        console.log(error)
        return res.end();
    }

}

export default { homeController, unmountController };
