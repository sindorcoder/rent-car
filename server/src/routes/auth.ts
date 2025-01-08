import { Request, Response } from "express";
import express from "express";
import AuthContoller from "../controllers/AuthController";
import { userValidation } from "../validations/user.validation";
import { verifyToken } from "../middlewares/verify-token";

const authController = new AuthContoller();
const router = express.Router();

router
    .post("/sign-in", userValidation("check"), (req: Request, res: Response) => authController.signIn(req, res))
    .post("/sign-up", userValidation("create"), (req: Request, res: Response) => authController.signUp(req, res))
    .post("/send-otp", (req: Request, res: Response) => authController.sendOtp(req, res))
    .post("/resend-otp", (req: Request, res: Response) => authController.resendOtp(req, res))
    .get("/profile", verifyToken(["user", "admin", "owner"]), (req: Request, res: Response) => authController.getProfile(req, res));
    
export default router