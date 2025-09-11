import generateSecureOTP from './uniqueNumberGen.js';
import { stdentResponseSheet } from '../ResponseStructure/studentResponseSheet.js';
import { writeFile, stat, mkdir, unlink } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const checkNumUnique = new Map();
const uploadImageINGemna = async ({ time, image, image_format, image_size }) => {
    if (image_size > (5 * 1024 * 1024)) {
        // path, message, status, status_message, success, redirect_path
        const result = stdentResponseSheet.studentResponse(
            'image size is to longer please provide under the 5mb',
            422, null, false, "/anywhere");
        return result;

        // throw new Error("wowow")
    }

    let genrateNum = generateSecureOTP(6);
    if (checkNumUnique.has(genrateNum)) {
        genrateNum = generateSecureOTP(6);
    }

    checkNumUnique.set(genrateNum, genrateNum);

    try {
        const outputDir = path.join(__dirname, '../upload');

        try {
            await mkdir(outputDir, { recursive: true });
        } catch (mkdirError) {
            console.log('Directory may already exist:', mkdirError);
        }

        const filePath = path.join(outputDir, `${genrateNum}.${image_format}`);
        const cleanBase64 = image.replace(/^data:image\/\w+;base64,/, '');
        const imageBuffer = Buffer.from(cleanBase64, 'base64');

        await writeFile(filePath, imageBuffer);

        console.log(`Image saved successfully: ${filePath}`);

        const stats = await stat(filePath);
        console.log(`File size: ${stats.size} bytes`);

        const result = stdentResponseSheet.studentResponse(
            'image uploaded successfully',
            202, null, true, "/gemna.success");
        return { ...result, upload_path: `upload/${genrateNum}.${image_format}` };

    } catch (error) {
        const result = stdentResponseSheet.studentResponse(
            'something was wrong with you in controller section',
            500, null, false, "/gemna.error");
        console.log(error);
        // await unlink(`upload/${genrateNum}.${image_format}`)
        return result;
    }
}


export default uploadImageINGemna;