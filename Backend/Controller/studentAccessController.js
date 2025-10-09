import generateSecureOTP from '../components/uniqueNumberGen.js';

const UserProfileDetails = async (req, res) => {
    try {
        const jwt_token = req.headers.authorization.split(" ")[1];
        if (!jwt_token) {
            return res.status(422).json({ message: "unauthorized access con jwt_token", success: false });
        }
        req.userDetails.password = generateSecureOTP();
        return res.status(200).json({ message: "successfully verify", success: true, data: req.userDetails });
    } catch (error) {
        return res.status(422).json({ message: error, success: false });
    }
}

export { UserProfileDetails };