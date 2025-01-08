import { Request, Response } from "express";
import express from "express";
import UserController from "../controllers/UserController";
import { userValidation, userUpdateValidation } from "../validations/user.validation";
import { verifyToken } from "../middlewares/verify-token";

const router = express.Router();
const userContoller = new UserController();

router
    .get("/", verifyToken(["admin", "owner"]), (req: Request, res: Response) => userContoller.getUsers(req, res))
    .post("/create", verifyToken(["admin", "owner"]), userValidation("create"), (req: Request, res: Response) => userContoller.createUser(req, res))
    .put("/:id", verifyToken(["user","admin", "owner"]), userUpdateValidation("update"), (req: Request, res: Response) => userContoller.updateUser(req, res))
    .get("/:id", verifyToken(["admin", "owner"]), (req: Request, res: Response) => userContoller.getUser(req, res))
    .delete("/:id", verifyToken(["admin", "owner"]), (req: Request, res: Response) => userContoller.deleteUser(req, res))
    .post("/promote/:id", verifyToken(["admin", "owner"]), (req: Request, res: Response) => userContoller.promoteUser(req, res))
export default router