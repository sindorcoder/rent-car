"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
class AuthContoller {
    async signUp(req, res) {
        try {
            const { email, password } = req.body;
            let user = await User_1.default.findOne({ email }, 'email').lean();
            if (user)
                return res.status(400).json({ message: "User already exists", payload: user });
            // const createOtpDocument = async (email: string, otp: string) => {
            //     try {
            //         const newOtp = await OtpSchema.create({ email, otp });
            //         console.log("New document saved to the database");
            //         await sendVerificationEmail(newOtp.email, newOtp.otp);
            //         return newOtp;
            //     } catch (error) {
            //         console.error("Error creating OTP document:", error);
            //         throw error;
            //     }
            // };
            const saltRounds = 10;
            const salt = bcrypt_1.default.genSaltSync(saltRounds);
            const hashPassword = bcrypt_1.default.hashSync(password, salt);
            user = await User_1.default.create({ ...req.body, password: hashPassword });
            return res.json({ message: "Successfully created new user", payload: user });
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
    async signIn(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User_1.default.findOne({ email }).lean();
            if (!user)
                return res.status(400).json({ message: "User does not exist" });
            const checkPassword = bcrypt_1.default.compareSync(password, user.password);
            if (!checkPassword)
                return res.status(400).json({ message: "Wrong password or email!" });
            const accessToken = jsonwebtoken_1.default.sign({ email: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '365d' });
            return res.json({ message: "Sign In", payload: { user, accessToken } });
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
}
exports.default = AuthContoller;
