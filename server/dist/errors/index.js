"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseErrors = void 0;
const parseErrors = async (validationErrors) => {
    const errors = [];
    validationErrors.forEach(error => {
        errors.push({
            param: error.params['missingProperty']
                ? error.params['missingProperty']
                : error.instancePath,
            message: error.message,
            value: error.params['missingProperty'] ? null : error.data,
        });
    });
    return errors;
};
exports.parseErrors = parseErrors;
