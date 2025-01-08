"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer_1.default.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });
        // Send emails to users
        let info = await transporter.sendMail({
            from: 'www.rentcar.uz',
            to: email,
            subject: title,
            html: body,
        });
        console.log("Email info: ", info);
        return info;
    }
    catch (error) {
        console.log(error.message);
    }
};
async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(email, "Verification Email", `<h1>Please confirm your OTP</h1>
         <p>Here is your OTP code: ${otp}</p>`);
        console.log("Email sent successfully: ", mailResponse);
    }
    catch (error) {
        console.log("Error occurred while sending email: ", error);
        throw error;
    }
}
exports.sendVerificationEmail = sendVerificationEmail;
exports.default = mailSender;
