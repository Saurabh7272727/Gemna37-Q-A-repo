import express, { Router } from 'express';
import { fetchActiveUsers, fetchAllConnections, fetchAllMessage } from '../Controller/student.fetchdata.controller.js';
import { UserAccessMiddleware } from '../middleware/studentAccessMiddleware.js';
import StudentModelMain from '../model/Students.js';
const router = new Router();


router.get('/', UserAccessMiddleware, fetchActiveUsers);
router.get('/connection', UserAccessMiddleware, fetchAllConnections);
router.get('/connection/:message/:message2', UserAccessMiddleware, fetchAllMessage);

router.post('/connection/notification/update/token', UserAccessMiddleware, async (req, res) => {
    const bodyData = req.body;

    if (bodyData == null || bodyData == undefined) {
        return res.status(404).json({
            message: "payload are missing",
            success: false,
            status: 404
        });
    }

    const { userId, token } = bodyData;

    if (!userId || !token) {
        return res.status(401).json({
            message: "payload are missing (userId or token)",
            success: false,
            status: 404
        });
    }

    try {
        const user = await StudentModelMain.findByIdAndUpdate(
            userId,
            { $set: { FCM_TOKEN: token } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                status: 404
            });
        }

        if (user) {
            return res.status(201).json({
                message: "Notification system are enable on this device",
                token: user?.FCM_TOKEN,
                success: true,
                status: 201
            });
        }

        throw new Error('somrthing was wrong');
    } catch (error) {
        console.log("error ==========================>", error);
        return res.status(505).json({
            message: error.message || "enternal server error",
            success: false,
            status: 505
        });
    }
});

router.post('/connection/notification/disabled', UserAccessMiddleware, async (req, res) => {
    const bodyData = req.body;


    if (bodyData == null || bodyData == undefined) {
        return res.status(404).json({
            message: "payload are missing",
            success: false,
            status: 404
        });
    }

    try {
        const { userId } = bodyData;

        const user = await StudentModelMain.findByIdAndUpdate(
            userId,
            { $set: { FCM_TOKEN: "empty" } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                status: 404
            });
        }
        if (user) {
            return res.status(201).json({
                message: "successfully notification service disabled",
                token: user?.FCM_TOKEN,
                success: true,
                status: 201
            });
        }
    } catch (error) {
        return res.status(505).json({
            message: error.message || "enternal server error",
            success: false,
            status: 505
        });
    }
});

export default router;
