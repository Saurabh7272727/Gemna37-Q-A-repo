
import { decryptData } from '../components/crypto.js';
import jwt from 'jsonwebtoken';
import StudentModelMain from '../model/Students.js';
const AuthBYSocket = async (token) => {
    try {
        const token_by_de = decryptData(token);

        const { role, jwt_token } = token_by_de;
        const arr = ['student'];

        if (arr.includes(role)) {
            const check = jwt.verify(jwt_token, process.env.JWT_SECURE);
            if (check) {
                const findUser = await StudentModelMain.findOne({ _id: check.id }).populate("ref_id");
                if (findUser) {
                    return { success: true, findUser }
                }
                return { success: false };
            } else {
                return { success: false };
            }
        } else {
            return { success: false };
        }
    } catch (error) {
        if (error) {
            return { success: false };
        }
    }


}

export default AuthBYSocket;