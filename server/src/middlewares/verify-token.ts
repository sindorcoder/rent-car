import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";  

export interface UserPayload {
    id: string;
    email: string;
    role: string;
}

export const verifyToken = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, decoded) => {
                if (err) {
                    return res.status(403).json({ status: "errors", code: 403, errors: "Invalid token" });
                }

                if (typeof decoded === 'object' && decoded !== null) {
                    const user = decoded as UserPayload;

                    if (!roles.includes(user.role)) {
                        return res.status(403).json({ status: "errors", code: 403, errors: "Forbidden: insufficient privileges" });
                    }

                    req.user = user;
                    next();
                } else {
                    return res.status(403).json({ status: "errors", code: 403, errors: "Invalid token payload" });
                }
            });
        } else {
            return res.status(401).json({ status: "errors", code: 401, errors: "Unauthorized" });
        }
    }
}