import nodemailer from "nodemailer";
import Mailgen from "mailgen";

const emailSender = async ({ message, reason, title, email }) => {
    try {
        let mailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: "Gemna notification service",
                link: "https://gemnaworld.vercel.app",
                logo: "https://th.bing.com/th/id/OIP.z4Y6UwyXNj6eqviWv70RPgHaHa?w=171&h=180&c=7&r=0&o=5&pid=1.7",
            },
        });

        let Info = {
            body: {
                name: email,
                intro: `${message}`,
                action: {
                    instructions:
                        `${reason}`,
                    button: {
                        color: "#22BC66",
                        text: `${title}`,
                        link: "https://gemnaworld.vercel.app",
                    },
                },
                outro: "If you did not interest this, please ignore this email.",
            },
        };

        let emailBody = mailGenerator.generate(Info);

        const config = {
            service: "gmail",
            port: 465,
            secure: true,
            auth: {
                user: process.env.NAME,
                pass: process.env.PASSWORD,
            },
        };

        const transport = nodemailer.createTransport(config);

        const messageObj = {
            from: process.env.NAME,
            to: email,
            subject: `${title}`,
            html: emailBody,
        };

        await transport.sendMail(messageObj);

        return true;
    } catch (error) {
        console.error("Email sending failed:", error);
        return false;
    }
};

export default emailSender;
