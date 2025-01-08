import express from "express";
import { Request, Response } from "express";
import { dotEnvConfig } from "../config/config";
import upload from "../helpers/upload-file";
import { verifyToken } from "../middlewares/verify-token";

import UploadController from "../controllers/UploadController";

const uploadController = new UploadController();

const router = express.Router();

dotEnvConfig();

router
    .post("/single", verifyToken(["admin", "user", "owner"]), upload.single('file'), ( req: Request, res: Response) => uploadController.uploadFile(req, res))
    .post("/multiple", verifyToken(["admin", "owner"]), upload.array('files'), ( req: Request, res: Response) => uploadController.uploadMultipleFiles(req, res))
    .delete("/delete/:filename", verifyToken(["admin", "user", "owner"]), ( req: Request, res: Response) => uploadController.deleteFile(req, res))

export default router