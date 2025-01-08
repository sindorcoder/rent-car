import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { sendVerificationEmail } from "../utils/mail-sender";
import crypto from "crypto";
import Otp from "../models/Otp";

interface IAuthController {
    signUp(req: Request, res: Response): Promise<Response>;
    signIn(req: Request, res: Response): Promise<Response>;
    sendOtp(req: Request, res: Response): Promise<Response>;
    getProfile(req: Request, res: Response): Promise<Response>;
    resendOtp(req: Request, res: Response): Promise<Response>;
}


class AuthContoller implements IAuthController {
    async signUp(req: Request, res: Response): Promise<Response> {
        try{
            const {email, password} = req.body;

            let user = await User.findOne({ email });

            if(user?.email_verified) return res.status(400).json({ message: "User already exists", payload: user });
            
        
            if(user) return res.status(400).json({ message: "User already registered please verify your email", payload: user });

            const otp = crypto.randomInt(100000, 999999).toString();

            const createOtpDocument = async (email: string, otp: string) => {
                try {
                    const newOtp = await Otp.create({ email, otp });
                    console.log("New document saved to the database", newOtp);
                    await sendVerificationEmail(newOtp.email, newOtp.otp);
                    return newOtp;
                } catch (error) {
                    console.error("Error creating OTP document:", error);
                    throw error;
                }
            };

            await createOtpDocument(email, otp);

            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashPassword = bcrypt.hashSync(password, salt);
            user = await User.create({ ...req.body, password: hashPassword });
            
            return res.json({ message: "Successfully created new user", payload: user });
        }
        catch(err: any) {
            return res.status(500).json({ message: err.message })
        }
    }

    async signIn(req: Request, res: Response): Promise<Response> {
        try{
            const {email, password} = req.body;

            const user = await User.findOne({ email }).lean();

            if(!user) return res.status(400).json({ message: "User does not exist" });

            if(!user.email_verified) return res.status(400).json({ message: "Please verify your email first" });

            const checkPassword = bcrypt.compareSync(password, user.password);

            if(!checkPassword) return res.status(400).json({ message: "Wrong password or email!" });

            const accessToken = jwt.sign({ email: user._id, role: user.role }, process.env.JWT_SECRET_KEY as string, { expiresIn: '365d' });

            return res.json({ message: "Signed in successfully", payload: { user, accessToken } });
        }
        catch(err: any) {
            return res.status(500).json({ message: err.message })
        }
    }

    async sendOtp(req: Request, res: Response): Promise<Response> {
        try{
            const { otp, email } = req.body;
            const registeredOtp = await Otp.find({ email }).sort({ createdAt: -1 }).limit(1);

            if (registeredOtp.length === 0 || otp !== registeredOtp[0].otp) {
                return res.status(400).json({
                    message: 'The OTP is not valid',
                    payload: otp
                });
            }

            await Otp.deleteMany({ email });

            await User.updateOne({ email }, { $set: { email_verified: true } });

            return res.json({ message: "OTP verified successfully", payload: registeredOtp[0].otp });
        }
        catch(err: any) {
            return res.status(500).json({ message: err.message })
        }
    }

    async getProfile(req: Request, res: Response): Promise<Response> {
        console.log(req.user);
        try {
            if (!req.user || typeof req.user !== 'object' || !('email' in req.user)) {
                return res.status(403).json({ message: "Invalid or missing user information" });
            }
    
            const user = await User.findById(req.user.email);
            return res.json({ message: "Get Profile", payload: user });
        }
        catch (err: any) {
            return res.status(500).json({ message: err.message });
        }
    }

    async resendOtp(req: Request, res: Response): Promise<Response> {
        try{   
            const {email} = req.body;
            let user = await User.findOne({ email });
            if(user?.email_verified) return res.status(400).json({ message: "User already verified", payload: user });

            const otp = crypto.randomInt(100000, 999999).toString();

            const createOtpDocument = async (email: string, otp: string) => {
                try {
                    const newOtp = await Otp.create({ email, otp });
                    console.log("New document saved to the database", newOtp);
                    await sendVerificationEmail(newOtp.email, newOtp.otp);
                    return newOtp;
                } catch (error) {
                    console.error("Error creating OTP document:", error);
                    throw error;
                }
            };

            const checkOtpAlreadySent = await Otp.findOne({ email });

            if(checkOtpAlreadySent) return res.status(400).json({ message: "OTP already sent" });

            const createOtp = await createOtpDocument(email, otp);

            if(!createOtp) return res.status(500).json({ message: "Error creating OTP document" });

            return res.json({ message: "OTP sent successfully", payload: createOtp });
        }
        catch(err: any) {
            return res.status(500).json({ message: err.message })
        }
    }
                
}

export default AuthContoller