import StudentModelMain from '../model/Students.js';
import jwt from 'jsonwebtoken'

const UserAccessMiddleware = async (req, res, next) => {

    try {
        const jwt_token = req.headers.authorization.trim().split(" ")[1];
        // console.log(jwt_token, req.headers.authorization)
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
        return res.status(422).json({ message: `server error Error-Code 422 ${error}`, success: false });
    }
}


export { UserAccessMiddleware };