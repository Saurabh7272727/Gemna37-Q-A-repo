import uploadImageINGemna from '../components/uploadImagesINGemna.js';
import cloudinaryUplaod from '../components/cloudinary.js';
import fs from 'fs/promises';
import { stdentResponseSheet } from '../ResponseStructure/studentResponseSheet.js';
import { ValidDateOCRData } from '../components/ValidDateOCRData.js';

const studentUplaodController = async (req, res) => {
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
    const { message, status, success, cloudinary_url } = cloud;

    try {
        if (success) {
            return res.status(result.status).json({ url, ...result, cloudinary_url });
        } else {
            fs.unlink(result.upload_path);
            const response = stdentResponseSheet.studentResponse(
                //message, status, status_message, success, redirect_path
                "Error: upload again",
                422, null, false, '/gemna.error'
            )
            return res.status(response.status).json(response);
        }
    } catch (error) {
        return res.status(response.status).json(response);
    } finally {
        fs.unlink(result.upload_path);
    }

}


const gemidUploadedImageProcess = async (req, res) => {
    const abort = new AbortController();

    if (!req?.body.success) {
        return res.status(204).json(stdentResponseSheet.studentResponse(
            // message, status, status_message, success, redirect_path
            "Provide a image", 204, null, false, '/geman.error'
        ))
    }

    const ID = setTimeout(() => {
        if (!res.headersSent) {
            console.log("abort the mission due to timeout");
            abort.abort();
            const result = stdentResponseSheet.studentResponse(
                "GEMID are not found (setTimeout)", 404, null, false, '/gemna.error'
            );
            res.status(404).end();
        }
    }, 13000);


    try {
        const OCR_URL = `https://api.ocr.space/parse/imageurl?apikey=${process.env.OCR_KEY}&url=${req?.body.cloudinary_url}&language=eng&isOverlayRequired=true`;
        const response = await fetch(OCR_URL, {
            method: "GET"
        });

        const result = await response.json();
        const { ParsedResults } = result;

        const textData = ParsedResults[0]?.TextOverlay?.Lines; // array form

        const checkingExistance = ValidDateOCRData(textData);

        if (checkingExistance?.success) {
            clearTimeout(ID);
            const result = stdentResponseSheet.studentResponse(
                // message, status, status_message, success, redirect_path
                "GEMID are verify", 201, null, true, '/gemna.success'
            )
            return res.status(checkingExistance.status).json({ ...checkingExistance, ...result })
        } else {
            const result = stdentResponseSheet.studentResponse(
                // message, status, status_message, success, redirect_path
                "GEMID are not found (not found)", 404, null, false, '/gemna.error'
            );
            return res.status(404).json(result);
        }


    } catch (error) {
        console.log(error)
        return res.status(505).json(stdentResponseSheet.studentResponse(
            // message, status, status_message, success, redirect_path
            "GEMID are not found (catch)", 500, null, false, '/geman.error'
        ))
    }

}

export { studentUplaodController, gemidUploadedImageProcess };