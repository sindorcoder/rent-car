"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carValidation = void 0;
const errors_1 = require("../errors");
const car_validation_schema_1 = require("./schema/car.validation.schema");
const carValidation = async (req, res, next) => {
    const isValid = (0, car_validation_schema_1.validateCar)(req.body);
    if (!isValid && car_validation_schema_1.validateCar.errors) {
        const error = await (0, errors_1.parseErrors)(car_validation_schema_1.validateCar.errors);
        return res.status(400).json({ status: 'errors', code: 400, errors: error });
    }
    next();
};
exports.carValidation = carValidation;
