"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const errors_1 = require("../errors");
const user_validation_schema_1 = require("./schema/user.validation.schema");
const userValidation = (context) => async (req, res, next) => {
    req.body.context = context;
    const isValid = (0, user_validation_schema_1.validateUser)(req.body);
    if (!isValid && user_validation_schema_1.validateUser.errors) {
        const error = await (0, errors_1.parseErrors)(user_validation_schema_1.validateUser.errors);
        return res.status(400).json({ status: 'errors', code: 400, errors: error });
    }
    next();
};
exports.userValidation = userValidation;
