import fs from 'fs/promises';
import cloudinaryUplaod from '../components/cloudinary.js';
import uploadImageINGemna from '../components/uploadImagesINGemna.js';
import { v2 as cloudinary } from 'cloudinary';
import { stdentResponseSheet } from '../ResponseStructure/studentResponseSheet.js';

const multer = async (req, res, next) => {
    const { time, image, image_format, image_size } = req.body;

    const { url } = req;
    const abortController = new AbortController();

    req.on('close', () => {
        console.log('Client disconnected');
        abortController.abort(); // Cancel async operation
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

    try {
        if (success) {
            req.cloud = { ...cloud };
            next();
        } else {
            fs.unlink(result.upload_path);
            const response = stdentResponseSheet.studentResponse(
                //message, status, status_message, success, redirect_path
                "Error: upload again",
                422, null, false, '/gemna.error'
            )
            await cloudinary.uploader.destroy(public_id);
            return res.status(response.status).json(response);
        }
    } catch (error) {
        await cloudinary.uploader.destroy(public_id);
        return res.status(response.status).json(response);
    } finally {
        fs.unlink(result.upload_path);
    }

}

export default multer;