import express, { Router } from 'express';
import { fetchActiveUsers, fetchAllConnections, fetchAllMessage } from '../Controller/student.fetchdata.controller.js';
import { UserAccessMiddleware } from '../middleware/studentAccessMiddleware.js';
import StudentModelMain from '../model/Students.js';
import { logger } from '../observability/logger.js';
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
    const authenticatedUserId = String(req.userDetails?._id || '');

    if (!userId || !token) {
        return res.status(401).json({
            message: "payload are missing (userId or token)",
            success: false,
            status: 404
        });
    }

    if (String(userId) !== authenticatedUserId) {
        return res.status(403).json({
            message: 'You can update the notification token only for the authenticated account',
            success: false,
            status: 403
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
        logger.error('Failed to update notification token', { message: error.message, userId });
        return res.status(500).json({
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
        const authenticatedUserId = String(req.userDetails?._id || '');

        if (!userId || String(userId) !== authenticatedUserId) {
            return res.status(403).json({
                message: 'You can disable notifications only for the authenticated account',
                success: false,
                status: 403
            });
        }

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
