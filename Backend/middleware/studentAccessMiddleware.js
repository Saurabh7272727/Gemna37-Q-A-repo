import StudentModelMain from '../model/Students.js';
import jwt from 'jsonwebtoken'
import { decryptData } from '../components/crypto.js';
import fs from 'fs/promises';

const UserAccessMiddleware = async (req, res, next) => {
    try {
        const jwt_token = req.GASID || req.headers.authorization.trim().split(" ")[1];
        // console.log(jwt_token, req.headers.authorization);

        if (!jwt_token) {
            return res.status(422).json({ message: "unauthorized access jwt_token", success: false });
        }

        const checkToken = jwt.verify(jwt_token, process.env.JWT_SECURE);
        if (!checkToken) {
            return res.status(422).json({ message: "unauthorized access checkToken", success: false });
        }


        const { id, password } = checkToken;

        const findById = await StudentModelMain.findOne({ _id: id }).populate("ref_id");

        if (!findById) {
            return res.status(422).json({ message: "unauthorized access findById", success: false });
        }

        const checkPassword = await findById.comparePassword(password);

        if (!checkPassword) {
            return res.status(422).json({ message: "unauthorized access checkPassword", success: false });
        }

        req.userDetails = findById;
        if (checkPassword) {
            next();
        }
    } catch (error) {
        try {
            await fs.unlink(req.file.path, (err) => {
                res.send(err);
            })
        } catch (error) {
            return res.status(422).json({ message: `server error Error-Code 422 ${error}`, success: false });
        }
        return res.status(422).json({ message: `server error Error-Code 422 ${error}`, success: false });
    }
}



const UserUploadSomethingLikeImage = async (req, res, next) => {

    try {
        let token = await req?.cookies?.GASID;

        if (token) {
            token = decryptData(token);
            if (['student', 'teacher'].includes(token?.role)) {
                req.GASID = token.jwt_token;
            } else {
                throw new Error("token are not valid");
            }
        } else {
            throw new Error("token are not valid");
        }
    } catch (error) {
        res.status(501).json({ message: `something was wrong with you, please reload the page - ${error.message}`, success: false });
        return;
    }


    try {
        const { time, image, image_format, image_size } = req.body;
        if (!time || !image_format) {
            res.status(501).json({ message: `Provide full information about payload`, success: false })
            return;
        }


        // only accept under 8Mb size of image size
        if ((image_size / 1024 / 1024).toFixed(2) > 9) {
            res.status(400).json({ message: `payload data size is too long`, success: false })
            return;
        }

        const typeArray = ['jpeg', 'png'];
        if (!typeArray.includes(image_format)) {
            res.status(400).json({ message: `image are required only in jpeg & png formate`, success: false })
            return;
        }

        if (typeArray.includes(image_format) && image && image_size) {
            next();
        }

    } catch (error) {
        res.status(501).json({ message: `Internal server error ${error.message}`, success: false });
        return;
    }
}


export { UserAccessMiddleware, UserUploadSomethingLikeImage };