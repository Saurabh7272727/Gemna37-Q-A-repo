import generateSecureOTP from '../components/uniqueNumberGen.js';
import fs from 'fs/promises';
import StudentModel from '../model/student.form.schema.js';
import { v2 as cloudinary } from 'cloudinary';
const UserProfileDetails = async (req, res) => {
    try {
        if (!req.headers.authorization) {
            return res.status(422).json({ message: "authorization token are missing, add authorization header", success: false });
        }
        const jwt_token = req.headers.authorization.split(" ")[1];
        if (!jwt_token) {
            return res.status(422).json({ message: "unauthorized access con jwt_token", success: false });
        }
        const updatedAt = req.updatedAt;
        if (updatedAt) {
            // Browser will be send on second time if api hit with (if-none-match) with time in milisecond - so compare if change
            // return updated blog else return Not modifieds
            const etag = updatedAt
                ? `${new Date(updatedAt).getTime()}`
                : `default`;
            if (req.headers['if-none-match'] === etag) {
                return res.status(304).end();
            }

            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('ETag', etag);
            return res.status(200).json({ message: "successfully verify", success: true, data: req.userDetails });
        } else {
            return res.status(404).json({ message: 'user deatils are not found', success: false });
        }

    } catch (error) {
        return res.status(422).json({ message: error, success: false });
    }
}

const UplaodImageHandler = async (req, res) => {
    let destroyID = "";
    let preimage = null;
    try {
        const findStudentByID = await StudentModel.findOne({ _id: req?.userDetails?.ref_id?._id });

        if (!findStudentByID) {
            res.status(401).json({ message: `UnAuthorized access`, success: false });
            return;
        }

        if (findStudentByID?.imageURL) {
            preimage = findStudentByID.imageURL.split("/").at(-1).slice(0, -4);
        }

        if (req?.cloud.success) {
            // using middleware to stored file in cloudinary;
            const { success, cloudinary_url, public_id } = req.cloud;
            if (!success) {
                throw new Error("Cloudinary are not worked");
            }


            try {
                destroyID = public_id;
                findStudentByID.imageURL = cloudinary_url;
                await findStudentByID.save();

                if (findStudentByID.imageURL) {
                    req.imageURL = findStudentByID.imageURL;
                } else {
                    throw new Error("Image are not saved!");
                }
            } catch (error) {
                await cloudinary.uploader.destroy(public_id);
                if (error.message)
                    throw new Error("Image are not saved!");
            }

        } else {
            res.status(401).json({ message: `UnAuthorized access`, success: false });
            return;
        }

        res.status(201).json({ message: `Successfully uploaded profile image`, status: 201, success: true, imageURL: req.imageURL });
    } catch (error) {
        await cloudinary.uploader.destroy(destroyID);
        res.status(501).json({ message: `Internal server error ${error.message}`, success: false });
        return;
    } finally {
        if (preimage) {
            await cloudinary.uploader.destroy(preimage);
        }
    }
}

export { UserProfileDetails, UplaodImageHandler };