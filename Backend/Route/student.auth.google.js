import { Router } from 'express';
import axios from 'axios';
import StudentModelMain from '../model/Students.js';
import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';
import { env } from '../config/env.js';
import { logger } from '../observability/logger.js';
import StudentModel from '../model/student.form.schema.js';


const router = new Router();


router.get('/auth/google', (req, res) => {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const state = crypto.randomBytes(24).toString('hex');

    res.cookie('google_oauth_state', state, {
        httpOnly: true,
        secure: env.isProduction,
        sameSite: 'lax',
        maxAge: 10 * 60 * 1000,
    });

    const options = {
        redirect_uri: `${env.backendUrl}/auth/google/callback`,
        client_id: env.googleAuth.clientId,
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        state,
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
        const returnedState = req.query.state;
        const savedState = req.cookies.google_oauth_state;

        if (!code || !returnedState || returnedState !== savedState) {
            res.clearCookie('google_oauth_state');
            return res.redirect(`${env.frontendUrl}/#/error/google/auth/${'Google Auth service are down, try few mintue later'}`);
        }

        res.clearCookie('google_oauth_state');
        const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
            client_id: env.googleAuth.clientId,
            client_secret: env.googleAuth.clientSecret,
            code,
            redirect_uri: `${env.backendUrl}/auth/google/callback`,
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
            if (!name || !email) {
                return res.redirect(`${env.frontendUrl}/#/error/google/auth/${'Google verification are failed, try again'}`);
            }

            let findByEmail = await StudentModelMain.findOne({ email: email }).maxTimeMS(30000);
            if (!findByEmail || !findByEmail.email) {
                const meaningFullMessage = 'Email are not found check the email address';
                return res.redirect(`${env.frontendUrl}/#/error/google/auth/${meaningFullMessage}`);
            }


            findByEmail = await StudentModelMain.findOne({ email: email }).populate("ref_id");

            if (!(findByEmail?.ref_id?.imageURL)) {
                const saveProfilePicture = await StudentModel.findById({ _id: findByEmail?.ref_id?._id });

                if (saveProfilePicture) {
                    saveProfilePicture.imageURL = picture;
                    await saveProfilePicture.save();
                }

            }

            const jwt_token = jwt.sign({ id: findByEmail._id, provider: 'google' }, env.jwtSecret, { expiresIn: "2h" });
            if (!jwt_token) {
                throw new Error("jsonwebtoken are not response");
            }
            logger.info('Google OAuth login successful', {
                userId: String(findByEmail._id),
                email,
                googleId,
            });
            res.redirect(`${env.frontendUrl}/#/success/google/auth?token=${jwt_token}`);

        } catch (error) {
            throw new Error("User not found");
        }
    } catch (error) {
        logger.error('Google OAuth error', {
            message: error.message,
            details: error.response?.data,
        });
        const meaningFullMessage = 'Email are not found. check the email address';
        res.redirect(`${env.frontendUrl}/#/error/google/auth/${meaningFullMessage}`);
    }
});


export default router;
