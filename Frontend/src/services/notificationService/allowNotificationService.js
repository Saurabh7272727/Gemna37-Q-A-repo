import { getToken } from "firebase/messaging";
import { messaging } from "./firebase.js";



//  to allow by user .... notification service enable or not

export const requestNotificationPermission = async () => {

    const permission = await Notification.requestPermission();

    if (permission === "granted") {

        const token = await getToken(messaging, {
            vapidKey: import.meta.env.VITE_APP_VAPID_KEY,
            serviceWorkerRegistration: await navigator.serviceWorker.register("../../../firebase-messaging-sw.js")
        });
        return { token, success: true };
    }
    return { success: false, message: "token are missing please allow notification setting on tap" };
};