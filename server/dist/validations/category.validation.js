"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryValidation = void 0;
const errors_1 = require("../errors");
const category_validation_schema_1 = require("./schema/category.validation.schema");
const categoryValidation = async (req, res, next) => {
    const isValid = (0, category_validation_schema_1.validateCategory)(req.body);
    if (!isValid && category_validation_schema_1.validateCategory.errors) {
        const error = await (0, errors_1.parseErrors)(category_validation_schema_1.validateCategory.errors);
        return res.status(400).json({ status: 'errors', code: 400, errors: error });
    }
    next();
};
exports.categoryValidation = categoryValidation;
