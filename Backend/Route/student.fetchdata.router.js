import express, { Router } from 'express';
import { fetchActiveUsers, fetchAllConnections, fetchAllMessage } from '../Controller/student.fetchdata.controller.js';
import { UserAccessMiddleware } from '../middleware/studentAccessMiddleware.js';

const router = new Router();


router.get('/', UserAccessMiddleware, fetchActiveUsers);
router.get('/connection', UserAccessMiddleware, fetchAllConnections);
router.get('/connection/:message/:message2', UserAccessMiddleware, fetchAllMessage);
export default router;
