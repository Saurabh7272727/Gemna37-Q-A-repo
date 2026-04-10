import { inngest } from "../client.js";
import emailSender from "../../Email/userNotifyEmailSchema.js";
import admin from "../../NotificationSystem/firebase.js";

const NotificationFunction = inngest.createFunction(
    { id: "notification_sender", retries: 1, idempotency: 'event.data.email' },
    { event: "phase_1_notify" },
    async ({ event, step }) => {
        const { FCM_TOKEN, userName, messageTitle, type, email } = event.data;

        if (!FCM_TOKEN) {
            const response1 = await step.run("user_have_not_fcm", async () => {
                return await emailSender({
                    message: "you have miss a new message on G-chat",
                    reason: "Please open the notification system on gemnaworld",
                    title: "You have a new message",
                    email,
                });
            });

            return {
                userName,
                email,
                type,
                message: response1
                    ? "gemna sent email notification"
                    : "gemna failed to send email notification",
            };
        }

        const responseByStep = await step.run(
            "user_send_browser_notification",
            async () => {
                const message = {
                    data: {
                        title: `sending a message ${userName}`,
                        body: messageTitle
                    },
                    token: FCM_TOKEN,
                };

                try {
                    await admin.messaging().send(message);
                    return true;
                } catch (error) {
                    return false;
                }
            }
        );

        return {
            email,
            send: responseByStep,
        };
    }
);

export default NotificationFunction;