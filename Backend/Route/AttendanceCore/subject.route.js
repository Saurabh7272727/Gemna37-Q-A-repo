import express, { Router } from 'express';
import { fetchRelatedSubjectByStudent } from '../../Controller/AttendanceController/subject.controller.js';
import { UserAccessMiddleware } from '../../middleware/studentAccessMiddleware.js';

const router = new Router();

router.post('/get', UserAccessMiddleware, fetchRelatedSubjectByStudent);

export default router;