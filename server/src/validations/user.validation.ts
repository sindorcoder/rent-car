import { Request, Response, NextFunction } from "express";
import { parseErrors } from "../errors";
import { validateUser, validateUpdateUser } from "./schema/user.validation.schema";

export const userValidation = (context: string) => async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    req.body.context = context
    const isValid = validateUser(req.body);
    if (!isValid && validateUser.errors) {
        const error = await parseErrors(validateUser.errors);
        return res.status(400).json({ status: 'errors', code: 400, errors: error })
    }
    next();
};

export const userUpdateValidation = ( context: string) => async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isValid = validateUpdateUser(req.body);
    req.body.context = context
    if (!isValid && validateUpdateUser.errors) {
        const error = await parseErrors(validateUpdateUser.errors);
        return res.status(400).json({ status: 'errors', code: 400, errors: error })
    }
    next();
}