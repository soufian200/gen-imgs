import nodemailer from "nodemailer";
interface IMailOptions {
    to: string;
    subject: string;
    text: string
}
const sendEmail = async (options: IMailOptions) => {

    let transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        auth: {
            user: process.env.EMAIL_AUTH_USER,
            pass: process.env.EMAIL_AUTH_PASS
        }
    });


    const { to, subject, text, } = options;

    let mailOptions = {
        from: "noreply@artgenerator.com",
        to,
        subject,
        text,
        html: "<h1>Reset your password code: </h1>"
    };


    await transport.sendMail(mailOptions)
}

export default sendEmail;