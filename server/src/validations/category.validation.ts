import { Request, Response, NextFunction } from "express";
import { parseErrors } from "../errors";
import { validateCategory, validateUpdateCategory } from "./schema/category.validation.schema";

export const categoryValidation =  async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isValid = validateCategory(req.body);
    if (!isValid && validateCategory.errors) {
        const error = await parseErrors(validateCategory.errors);
        return res.status(400).json({ status: 'errors', code: 400, errors: error })
    }
    next();
};

export const updateCategoryValidation =  async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isValid = validateUpdateCategory(req.body);
    if (!isValid && validateUpdateCategory.errors) {
        const error = await parseErrors(validateUpdateCategory.errors);
        return res.status(400).json({ status: 'errors', code: 400, errors: error })
    }
    next();
}