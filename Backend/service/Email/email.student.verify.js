import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import { env } from '../../config/env.js';
import { logger } from '../../observability/logger.js';

const emailSender = async (email, otp, message) => {
    try {
        let mailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: "Gemna.AI Email Service (GES)",
                link: "https://gemna37-q-a-repo.vercel.app/#/landing",
                logo: "https://th.bing.com/th/id/OIP.z4Y6UwyXNj6eqviWv70RPgHaHa?w=171&h=180&c=7&r=0&o=5&pid=1.7",
            },
        });

        let Info = {
            body: {
                name: email,
                intro: `Your OTP Code is ---- **${message}**`,
                action: {
                    instructions:
                        "Please use this OTP to complete your verification process. and don't be delete the email",
                    button: {
                        color: "#22BC66",
                        text: `Verify OTP`,
                        link: "https://gemna37-q-a-repo.vercel.app/",
                    },
                },
                outro: "If you did not request this, please ignore this email.",
            },
        };

        let emailBody = mailGenerator.generate(Info);

        const config = {
            service: "gmail",
            port: 465,
            secure: true,
            auth: {
                user: env.email.name,
                pass: env.email.password,
            },
        };

        const transport = nodemailer.createTransport(config);

        const messageObj = {
            from: env.email.name,
            to: email,
            subject: `Gemna.AI OTP Verification - ${otp}`,
            html: emailBody,
        };

        await transport.sendMail(messageObj);

        return true;
    } catch (error) {
        logger.error('OTP email sending failed', { message: error.message, email });
        return false;
    }
};

export default emailSender;
