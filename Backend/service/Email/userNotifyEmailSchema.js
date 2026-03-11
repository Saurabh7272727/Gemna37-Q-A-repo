import nodemailer from "nodemailer";
import Mailgen from "mailgen";

const emailSender = async ({ message, reason, title, email }) => {
    try {

        const mailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: "Gemna",
                link: "https://gemnaworld.vercel.app",
                logo: "https://th.bing.com/th/id/OIP.z4Y6UwyXNj6eqviWv70RPgHaHa?w=171&h=180&c=7&r=0&o=5&pid=1.7",
                copyright: `Copyright © ${new Date().getFullYear()} Gemna. All rights reserved.`
            },
        });

        const Info = {
            body: {
                greeting: "Hello",
                name: email,

                intro: [
                    `${message}`
                ],

                table: {
                    data: [
                        {
                            "Notification": "You not enabled a notification on gemnaworld",
                            "Platform": "Gemna G-Chat",
                            "Status": "Unread"
                        }
                    ]
                },

                action: {
                    instructions: reason,
                    button: {
                        color: "#5865F2",
                        text: "Open G-Chat",
                        link: "https://gemnaworld.vercel.app"
                    }
                },

                outro: [
                    "You're receiving this email because a new message arrived while you were offline.",
                    "If this wasn't relevant to you, you can safely ignore this email."
                ],

                signature: "Team Gemna"
            }
        };

        const emailBody = mailGenerator.generate(Info);

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