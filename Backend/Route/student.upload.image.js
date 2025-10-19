import { Router } from 'express';
import {
    studentUplaodController, gemidUploadedImageProcess, registerationGEMID,
    getAllGemIdLog, verifyEmailAddress, OtpVerificationHandler, LoginHandler
} from '../Controller/student.upload.controller.js'
import { verifyStudentFormSubmit } from '../middleware/student.upload.middleware.js';
import { UserProfileDetails, UplaodImageHandler } from '../Controller/studentAccessController.js';
import { UserAccessMiddleware, UserUploadSomethingLikeImage } from '../middleware/studentAccessMiddleware.js';
import { upload } from '../utils/multer.js';

const router = new Router();

router.post('/image/upload/gemid', studentUplaodController);
router.post('/gemnaId/validation', gemidUploadedImageProcess)
router.post('/singup_with_gemna', verifyStudentFormSubmit, registerationGEMID);
router.post('/get/all/gemidlog', getAllGemIdLog);
router.post('/email/verification', verifyEmailAddress);
router.post('/otp/verification', OtpVerificationHandler);
router.post('/login', LoginHandler)
router.get("/account/access", UserAccessMiddleware, UserProfileDetails);
router.post('/upload/profile/image', upload.single("image"), UserUploadSomethingLikeImage, UserAccessMiddleware,
    UplaodImageHandler
)
export default router;