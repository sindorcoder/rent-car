import { Request, Response, NextFunction } from "express";
import { parseErrors } from "../errors";
import { validateCar, validateUpdateCar } from "./schema/car.validation.schema";

export const carValidation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isValid = validateCar(req.body);
    if (!isValid && validateCar.errors) {
        const error = await parseErrors(validateCar.errors);
        return res.status(400).json({ status: 'errors', code: 400, errors: error })
    }
    next();
};

export const updateCarValidation = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    const isValid = validateUpdateCar(req.body);
    if (!isValid && validateUpdateCar.errors) {
        const error = await parseErrors(validateUpdateCar.errors);
        return res.status(400).json({ status: 'errors', code: 400, errors: error })
    }
    next();
}