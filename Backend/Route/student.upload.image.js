import { Router } from 'express';
import { studentUplaodController, gemidUploadedImageProcess } from '../Controller/student.upload.controller.js'

const router = new Router();

router.post('/image/upload/gemid', studentUplaodController);
router.post('/gemnaId/validation', gemidUploadedImageProcess)

export default router;