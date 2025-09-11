import { v2 as cloudinary } from 'cloudinary';
//CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@dqbjfmyce
import dotenv from 'dotenv';
dotenv.config();

const cloudinaryUplaod = async (image_path) => {

    // Configuration
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_SECRET_KEY
    });

    const options = {
        use_filename: true,
        unique_filename: true,
        overwrite: true,
    };

    try {
        const result = await cloudinary.uploader.upload(`${image_path}`, options);
        const { url } = result;
        return { message: "upload", status: 202, success: true, cloudinary_url: url };
    } catch (error) {
        return { message: "something was wrong", status: 505, success: false };
    }

}

export default cloudinaryUplaod;