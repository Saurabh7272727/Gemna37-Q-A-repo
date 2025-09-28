import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import generatePdfBuffer from '../pdf.generation.js';

const emailSender = async (email, messages, OTP, person) => {
    try {
        const pdfBuffer = await generatePdfBuffer(person);
        let mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                name: 'Gemna.AI Email Service(GES)',
                link: 'https://gemna37-q-a-repo.vercel.app/#/landing',
                logo: 'https://th.bing.com/th/id/OIP.z4Y6UwyXNj6eqviWv70RPgHaHa?w=171&h=180&c=7&r=0&o=5&pid=1.7'
            }
        });
        let Info = {
            body: {
                name: email,
                intro: `Welcome ${person.firstName} ${person.lastName}`,
                action: {
                    instructions: 'All Your Campus Tools. One Unified Platform.',
                    button: {
                        color: '#22BC66',
                        text: `Convert pdf_to_jpg`,
                        link: 'https://www.ilovepdf.com/pdf_to_jpg'
                    }
                },
                outro: `${email} feels to connect with Gemna. Thanks.`
            }
        };

        let emailBody = mailGenerator.generate(Info);

        // Nodemailer config
        const config = {
            service: 'gmail',
            port: 465,
            secure: true,
            auth: {
                user: process.env.NAME,
                pass: process.env.PASSWORD
            },
        };

        const transport = nodemailer.createTransport(config);

        const message = {
            from: process.env.NAME,
            to: email,
            subject: `Gemna.AI Email Service(GES) ${messages}`,
            html: emailBody,
            attachments: [
                {
                    filename: `GEMID-${person.firstName}.pdf`,
                    content: pdfBuffer,
                    contentType: 'application/pdf',
                },
            ],
        };

        await transport.sendMail(message);

        return person;
    } catch (error) {
        return false;
    }


};

export default emailSender;