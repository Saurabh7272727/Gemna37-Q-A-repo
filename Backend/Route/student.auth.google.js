import express, { Router } from 'express';
import axios from 'axios';
import StudentModelMain from '../model/Students.js';
import jwt from 'jsonwebtoken';

const router = new Router();


router.get('/auth/google', (req, res) => {

    console.log("req are arrived");

    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

    const options = {
        redirect_uri: 'http://localhost:3000/auth/google/callback',
        client_id: process.env.GOOGLE_CLIENT_ID,
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ].join(' '),
    };

    const qs = new URLSearchParams(options);
    res.redirect(`${rootUrl}?${qs.toString()}`);
});

router.get('/auth/google/callback', async (req, res) => {
    try {
        const code = req.query.code;
        // console.log(process.env.FRONTEND_URL);
        const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            code,
            redirect_uri: 'http://localhost:3000/auth/google/callback',
            grant_type: 'authorization_code'
        });

        const { access_token } = tokenResponse.data;

        const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });

        const { email, id: googleId, name, picture } = userInfoResponse.data;
        try {
            let findByEmail = await StudentModelMain.findOne({ email: email }).maxTimeMS(30000);
            if (!findByEmail && !findByEmail.email) {
                throw new Error("User not found");
            }
            let password = "gemna.ai_fork_()&^^^^";
            findByEmail = await StudentModelMain.findOne({ email: email }).populate("ref_id");

            const jwt_token = jwt.sign({ id: findByEmail._id, password: password }, process.env.JWT_SECURE, { expiresIn: "2h" });
            if (!jwt_token) {
                throw new Error("jsonwebtoken are not response");
            }
            res.cookie("token", jwt_token);
            res.redirect(`${process.env.FRONTEND_URL}/success/google/auth?token=${jwt_token}`);

        } catch (error) {
            throw new Error("User not found");
        }
    } catch (error) {
        console.error('Google OAuth error:', error.response?.data || error.message);
        res.redirect(`${process.env.FRONTEND_URL}/error/google/auth`);
    }
});


export default router;