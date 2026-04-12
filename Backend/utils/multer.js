import fs from 'fs/promises';
import cloudinaryUplaod from '../components/cloudinary.js';
import uploadImageINGemna from '../components/uploadImagesINGemna.js';
import { v2 as cloudinary } from 'cloudinary';
import { stdentResponseSheet } from '../ResponseStructure/studentResponseSheet.js';
import { logger } from '../observability/logger.js';

const multer = async (req, res, next) => {
    const { time, image, image_format, image_size } = req.body;

    if (!time || !image || !image_format || !image_size) {
        const response = stdentResponseSheet.studentResponse(
            //message, status, status_message, success, redirect_path
            "Error: upload again",
            422, null, false, '/gemna.error'
        )
        return res.status(422).json({ ...response });
    }

    const { url } = req;
    const abortController = new AbortController();

    req.on('close', () => {
        logger.warn('Client disconnected during profile image upload');
        abortController.abort();// Cancel async operation
    });
    if (abortController.signal.aborted) {
        return res.end();
    }
    const result = await uploadImageINGemna(req.body);

    if (!result.success) {
        return res.status(result.status).json({ url, ...result });
    }

    const cloud = await cloudinaryUplaod(result.upload_path);
    const { message, status, success, cloudinary_url, public_id } = cloud;
    const response = stdentResponseSheet.studentResponse(
        "Error: upload again",
        422, null, false, '/gemna.error'
    );

    try {
        if (success) {
            req.cloud = { ...cloud };
            return next();
        } else {
            await fs.unlink(result.upload_path).catch(() => null);
            if (public_id) {
                await cloudinary.uploader.destroy(public_id);
            }
            return res.status(response.status).json(response);
        }
    } catch (error) {
        logger.error('Profile image upload middleware failed', { message: error.message });
        if (public_id) {
            await cloudinary.uploader.destroy(public_id).catch(() => null);
        }
        return res.status(response.status).json(response);
    } finally {
        await fs.unlink(result.upload_path).catch(() => null);
    }

}

export default multer;
