import express, { Router } from 'express';
import { fetchRelatedSubjectByStudent, linkTheRelatedSubject, getAllLinkedSuject } from '../../Controller/AttendanceController/subject.controller.js';
import { UserAccessMiddleware } from '../../middleware/studentAccessMiddleware.js';

const router = new Router();

router.post('/get', UserAccessMiddleware, fetchRelatedSubjectByStudent);
router.post('/link/subject', UserAccessMiddleware, linkTheRelatedSubject);
router.post("/get/linked/subject", UserAccessMiddleware, getAllLinkedSuject)

export default router;