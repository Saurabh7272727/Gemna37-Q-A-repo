import uploadImageINGemna from '../components/uploadImagesINGemna.js';
import cloudinaryUplaod from '../components/cloudinary.js';
import fs from 'fs/promises';
import { stdentResponseSheet } from '../ResponseStructure/studentResponseSheet.js';
import { ValidDateOCRData } from '../components/ValidDateOCRData.js';
import emailSenderOfOTP from '../service/Email/email.student.verify.js';
import generateSecureOTP from '../components/uniqueNumberGen.js';
import StudentModel from '../model/student.form.schema.js';
import StudentOtpLog from '../model/otp.student.schema.js';
import StudentModelMain from '../model/Students.js';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import { inngest } from './../service/Inngest/client.js';
import { env } from '../config/env.js';
import { logger } from '../observability/logger.js';


const studentUplaodController = async (req, res) => {
    try {
        const { time, image, image_format, image_size } = req.body;

        const { url } = req;
        const abortController = new AbortController();

        req.on('close', () => {
            logger.warn('Client disconnected during student image upload');
            abortController.abort(); // cancel ongoing async task
        });



        const result = await uploadImageINGemna(req.body);

        if (abortController.signal.aborted) {
            return; // stop processing
        }
        if (!result.success) {
            return res.status(result.status).json({ url, ...result });
        }

        const cloud = await cloudinaryUplaod(result.upload_path);
        const { message, status, success, cloudinary_url, public_id } = cloud;
        const uploadFailureResponse = stdentResponseSheet.studentResponse(
            "Error: upload again",
            422, null, false, '/gemna.error'
        );

        try {
            if (success) {
                return res.status(result.status).json({ url, ...result, cloudinary_url, public_id });
            } else {
                await cloudinary.uploader.destroy(public_id);
                return res.status(uploadFailureResponse.status).json(uploadFailureResponse);
            }
        } catch (error) {
            await cloudinary.uploader.destroy(public_id);
            return res.status(uploadFailureResponse.status).json(uploadFailureResponse);
        } finally {
            await fs.unlink(result.upload_path).catch(() => null);
        }
    } catch (err) {
        const response = stdentResponseSheet.studentResponse(
            //message, status, status_message, success, redirect_path
            `${err.message || 'Internal server error, uploading error'}`,
            422, null, false, '/gemna.error'
        )
        return res.status(response.status).json(response);
    }


}


const gemidUploadedImageProcess = async (req, res) => {
    const abort = new AbortController();

    if (!req?.body.success) {
        await cloudinary.uploader.destroy(req?.body.public_id);
        return res.status(204).json(stdentResponseSheet.studentResponse(
            // message, status, status_message, success, redirect_path
            "Provide a image", 204, null, false, '/geman.error'
        ))
    }

    const ID = setTimeout(async () => {
        if (!res.headersSent) {
            logger.warn('GEMID OCR process timed out');
            abort.abort();
            const result = stdentResponseSheet.studentResponse(
                // message, status, status_message, success, redirect_path
                "GEMID are not found (setTimeout)", 404, null, false, '/gemna.error'
            );
            await cloudinary.uploader.destroy(req?.body.public_id);
            return res.status(404).json(result);
        }
    }, 26000);


    try {
        const OCR_URL = `https://api.ocr.space/parse/imageurl?apikey=${process.env.OCR_KEY}&url=${req?.body.cloudinary_url}&language=eng&isOverlayRequired=true`;
        const response = await fetch(OCR_URL, {
            method: "GET",
            headers: {
                "apikey": `${process.env.OCR_KEY}`
            }
        });

        const result = await response.json();
        const { ParsedResults } = result;
        const textData = ParsedResults[0]?.TextOverlay?.Lines; // array form

        const checkingExistance = await ValidDateOCRData(textData);


        if (checkingExistance?.success) {
            clearTimeout(ID);
            const result = stdentResponseSheet.studentResponse(
                // message, status, status_message, success, redirect_path
                "GEMID are verify", 201, null, true, '/gemna.success'
            )
            return res.status(checkingExistance.status).json({ ...checkingExistance, ...result })
        } else {
            await cloudinary.uploader.destroy(req?.body.public_id);
            const result = stdentResponseSheet.studentResponse(
                // message, status, status_message, success, redirect_path
                "GEMID are not found (not found)", 404, null, false, '/gemna.error'
            );
            return res.status(404).json(result);
        }


    } catch (error) {

        const d = await cloudinary.uploader.destroy(req?.body.public_id);
        logger.error('GEMID OCR processing failed', {
            message: error.message,
            cloudinaryUrl: req?.body.cloudinary_url,
            destroyResult: d,
        });
        return res.status(505).json(stdentResponseSheet.studentResponse(
            // message, status, status_message, success, redirect_path
            "GEMID are not found (catch)", 500, null, false, '/geman.error'
        ))
    }

}



const registerationGEMID = async (req, res) => {
    const { email, branch, collegeID, course,
        fatherName, firstName, lastName, motherName, rollNumber, status, year
    } = req.body;

    const abortController = new AbortController();
    req.on('close', () => {
        logger.warn('Client disconnected during registration');
        abortController.abort(); // Cancel async operation
    });
    if (abortController.signal.aborted) {
        return; // stop processing
    }

    try {
        if (!req?.body?.email) {
            return res.status(400).json({
                message: "Email is required",
                success: false,
                status: "VALIDATION_ERROR",
            });
        }

        const submitLastModel = new StudentModel({
            ...req.body,
            Indb: true,
        });

        await submitLastModel.save();
        const isNew =
            submitLastModel.createdAt ==
            submitLastModel.updatedAt;

        logger.info('Student registration record stored', { isNew, studentId: String(submitLastModel._id) });

        const otp = generateSecureOTP();

        try {
            await inngest.send({
                name: "mail-sender-by-gemna",
                data: {
                    id: submitLastModel._id,
                    emailID: req.body.email,
                    OTP: otp,
                    message: "inQueue the email in inngest",
                },
            });
        } catch (inngestError) {
            submitLastModel.emailAreSendStatus = "failed";
            await submitLastModel.save();

            return res.status(500).json({
                message: "Failed to enqueue email job",
                success: false,
                status: "INNGEST_ERROR",
            });
        }

        return res.status(201).json({
            message: "email are send by service",
            success: true,
            status: "ACCEPTED",
            studentData: {
                ...req.body,
                Indb: true,
                _id: submitLastModel._id,
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
            status: 500,
        });
    }

}

const getAllGemIdLog = async (req, res) => {
    try {
        const result = await StudentModel.find();
        res.status(200).json({ message: "All student list", success: true, data: result, status: 200 });
        return;
    } catch (error) {
        res.status(500).json({ message: error.message, success: false, status: 500 });
    }

}


const verifyEmailAddress = async (req, res) => {
    const { email } = req.body;

    if (!email || !email.endsWith("@gmail.com") || email.length > 60) {
        res.status(501).json({ message: "email are wrong format, check again", success: false, status: 501 });
        return;
    }
    try {
        const findEmailInOtpSchema = await StudentOtpLog.findOne({ email: email });
        if (findEmailInOtpSchema) {
            res.cookie("id", findEmailInOtpSchema._id, {
                httpOnly: true,
                sameSite: 'lax',
                secure: env.isProduction,
            });
            res.status(202).json({ message: "Already otp are send on email", success: true, token: { id: findEmailInOtpSchema._id, email }, status: 202 });
            return;
        }
    } catch (error) {
        res.status(404).json({ message: "something was wrong in catch", success: false, status: 404 });
        return;
    }

    try {
        const OTP = generateSecureOTP();
        const returnData = await emailSenderOfOTP(email, OTP, "Gemna.ai email verification OTP");
        if (returnData === false) {
            res.status(501).json({ message: "email service are not work", success: false, status: 501 });
            return;
        }
        const saveDataBase = new StudentOtpLog({ OTP, email });
        const data_id = await saveDataBase.save();
        res.cookie("id", data_id, {
            httpOnly: true,
            sameSite: 'lax',
            secure: env.isProduction,
        });
        res.status(202).json({ message: "send otp on email", success: true, token: { id: data_id._id, email }, status: 202 });
        return;
    } catch (error) {
        res.status(501).json({ message: "something was wrong in second catch", success: false, status: 501 });
        return;
    }
}

const OtpVerificationHandler = async (req, res) => {
    try {
        const { password, re_password, OTP, captchaCode, email, id } = req.body;
        // password and re_password compare in fortend, and extra validation like - captchaCode;


        if (!password || !OTP || !email || !id) {
            res.status(404).json({ message: "invalid request", success: false, status: 404 });
            return;
        }
        if (OTP.length !== 6) {
            res.status(404).json({ message: "invalid request", success: false, status: 404 });
            return;
        }

        const checkOTP = await StudentOtpLog.findOne({ OTP: OTP, _id: id });
        if (!checkOTP) {
            res.status(404).json({ message: "Otp are not match", success: false, status: 404 });
            return;
        }

        const findStudent = await StudentModel.findOne({ email: email });
        if (!findStudent) {
            res.status(404).json({ message: "invalid user request", success: false, status: 404 });
            return;
        }

        const exportData = {
            ref_id: findStudent._id,
            email: email,
            password: password
        }

        findStudent.status.label = "Active";
        findStudent.status.value = "active";
        await findStudent.save();
        const StudentData = new StudentModelMain(exportData);
        const token_student = await StudentData.save();

        res.status(202).json({
            message: "successfully sign-up", success: true, token: {
                id: token_student._id,
                email: email,
                password: password,
                name: `${findStudent.firstName} ${findStudent.lastName}`,
                imageURL: findStudent?.imageURL
            }, status: 202
        })
    } catch (error) {
        logger.warn('OTP verification failed', { message: error.message });
        if (error.message.slice(0, 6) === 'E11000') {
            res.status(404).json({ message: "Your account is already set up! Please sign in using your email and password.", success: false, status: 404 });
            return;
        }
        res.status(404).json({ message: "Something was wrong internally", success: false, status: 404 });
        return;
    }
}


const LoginHandler = async (req, res) => {
    const { email, id, name, password } = req.body;
    try {
        if (email && password && name && id) {
            const findUserInStudentMain = await StudentModelMain.findOne({ email: email, _id: id }).populate("ref_id");

            if (!findUserInStudentMain) {
                return res.status(404).json({ message: "check your email or password are wrong(not found)", success: false, status: 404 })
            }

            const checkPassword = await findUserInStudentMain.comparePassword(password);

            if (!checkPassword) {
                return res.status(404).json({ message: "check your email or password are wrong", success: false, status: 404 })
            }

            const jwt_token = jwt.sign(
                { id: findUserInStudentMain._id, credentialHash: findUserInStudentMain.password },
                env.jwtSecret,
                { expiresIn: "4h" }
            );

            if (!jwt_token) {
                throw new Error("jsonwebtoken are not response");
            }

            return res.status(202).json({
                message: "successfully login", success: true, jwt_token: jwt_token, status: 202
            });

        } else if (email && password) {
            let findUserInStudentMain = await StudentModelMain.findOne({ email: email }).maxTimeMS(30000);

            if (!findUserInStudentMain) {
                return res.status(404).json({ message: "check your email or password are wrong(not found)", success: false, status: 404 })
            }

            findUserInStudentMain = await StudentModelMain.findOne({ email: email }).populate("ref_id");

            const checkPassword = await findUserInStudentMain.comparePassword(password);
            if (!checkPassword) {
                return res.status(404).json({ message: "check your email or password are wrong", success: false, status: 404 })
            }

            const jwt_token = jwt.sign(
                { id: findUserInStudentMain._id, credentialHash: findUserInStudentMain.password },
                env.jwtSecret,
                { expiresIn: "2h" }
            );
            if (!jwt_token) {
                throw new Error("jsonwebtoken are not response");
            }

            return res.status(202).json({
                message: "successfully login", success: true, jwt_token: jwt_token, status: 202
            });

        }

        return res.status(403).json({ message: "Server are not responed", success: false, status: 403 });
    } catch (error) {
        return res.status(404).json({ message: `Internal server error : ${error.message}`, success: false, status: 404 })
    }
}

export {
    studentUplaodController,
    gemidUploadedImageProcess,
    registerationGEMID,
    getAllGemIdLog,
    verifyEmailAddress,
    OtpVerificationHandler,
    LoginHandler
};
