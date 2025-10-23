import express, { Router } from 'express';
import { fetchActiveUsers } from '../Controller/student.fetchdata.controller.js';
import { UserAccessMiddleware } from '../middleware/studentAccessMiddleware.js';

const router = new Router();


router.get('/', UserAccessMiddleware, fetchActiveUsers);


export default router;
