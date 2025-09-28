import { Router } from 'express';
import {
    studentUplaodController, gemidUploadedImageProcess, registerationGEMID,
    getAllGemIdLog, verifyEmailAddress, OtpVerificationHandler
} from '../Controller/student.upload.controller.js'
import { verifyStudentFormSubmit } from '../middleware/student.upload.middleware.js';

const router = new Router();

router.post('/image/upload/gemid', studentUplaodController);
router.post('/gemnaId/validation', gemidUploadedImageProcess)
router.post('/singup_with_gemna', verifyStudentFormSubmit, registerationGEMID);
router.post('/get/all/gemidlog', getAllGemIdLog);
router.post('/email/verification', verifyEmailAddress);
router.post('/otp/verification', OtpVerificationHandler);

export default router;