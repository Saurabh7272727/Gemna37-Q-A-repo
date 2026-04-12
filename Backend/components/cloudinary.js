import { v2 as cloudinary } from 'cloudinary';
import { env } from '../config/env.js';
import { logger } from '../observability/logger.js';

const cloudinaryUplaod = async (image_path) => {
    cloudinary.config({
        cloud_name: env.cloudinary.cloudName,
        api_key: env.cloudinary.apiKey,
        api_secret: env.cloudinary.apiSecret
    });

    const options = {
        use_filename: true,
        unique_filename: true,
        overwrite: true,
    };

    try {
        const result = await cloudinary.uploader.upload(`${image_path}`, options);
        const { url, public_id } = result;
        return { message: "upload", status: 202, success: true, cloudinary_url: url, public_id };
    } catch (error) {
        logger.error('Cloudinary upload failed', { message: error.message, imagePath: image_path });
        return { message: "something was wrong", status: 505, success: false };
    }

}

export default cloudinaryUplaod;
