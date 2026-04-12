import admin from "firebase-admin";
import { env } from '../../config/env.js';

if (!admin.apps.length && env.firebase.projectId && env.firebase.clientEmail && env.firebase.privateKey) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: env.firebase.projectId,
            clientEmail: env.firebase.clientEmail,
            privateKey: env.firebase.privateKey,
        }),
    });
}

export default admin;
