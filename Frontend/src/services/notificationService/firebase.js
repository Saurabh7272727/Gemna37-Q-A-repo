import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
    authDomain: "gemna-notification.firebaseapp.com",
    projectId: "gemna-notification",
    storageBucket: "gemna-notification.firebasestorage.app",
    messagingSenderId: "207734462937",
    appId: "1:207734462937:web:e673ad61ff98b3991561c8",
    measurementId: import.meta.env.VITE_APP_MEATD
};

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);