"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCategory = void 0;
const messages_1 = require("../../errors/messages");
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const ajv_errors_1 = __importDefault(require("ajv-errors"));
const ajv = new ajv_1.default({
    allErrors: true,
    verbose: true
});
(0, ajv_formats_1.default)(ajv);
(0, ajv_errors_1.default)(ajv /*,{ singleError: true }*/);
const categorySchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            minLength: 4,
            maxLength: 20,
            errorMessage: {
                minLength: `${messages_1.VALIDATION_ERRORS.MIN_LENGTH} 4 character`,
                maxLength: messages_1.VALIDATION_ERRORS.MAX_LENGTH,
                type: `${messages_1.VALIDATION_ERRORS.TYPE} String`,
            },
        },
        image: {
            type: 'string',
            errorMessage: {
                type: `${messages_1.VALIDATION_ERRORS.TYPE} String`,
            },
        },
        status: {
            type: 'string',
            enum: ["active", "inactive"],
            errorMessage: {
                enum: `${messages_1.VALIDATION_ERRORS.ENUM} ["active", "inactive"]`,
            },
        },
    },
    required: ['name', 'image', 'status'],
    additionalProperties: false
};
exports.validateCategory = ajv.compile(categorySchema);
