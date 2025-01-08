import { UserPayload } from "../middlewares/verify-token";

declare module "express-serve-static-core" {
    interface Request {
        user?: UserPayload;
    }
}