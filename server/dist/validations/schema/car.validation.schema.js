"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCar = void 0;
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
const carSchema = {
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
        images: {
            type: 'array',
            items: {
                type: 'string',
            },
            errorMessage: {
                type: `${messages_1.VALIDATION_ERRORS.TYPE} Array`,
            },
        },
        description: {
            type: 'string',
            minLength: 4,
            maxLength: 2000,
            errorMessage: {
                minLength: `${messages_1.VALIDATION_ERRORS.MIN_LENGTH} 4 characters`,
                maxLength: messages_1.VALIDATION_ERRORS.MAX_LENGTH,
                type: `${messages_1.VALIDATION_ERRORS.TYPE} String`,
            },
        },
        price: {
            type: 'number',
            errorMessage: {
                type: `${messages_1.VALIDATION_ERRORS.TYPE} Number`,
            },
        },
        status: {
            type: 'string',
            enum: ["active", "inactive"],
            errorMessage: {
                type: `${messages_1.VALIDATION_ERRORS.TYPE} String`,
            },
        },
        rent_price: {
            type: 'number',
            errorMessage: {
                type: `${messages_1.VALIDATION_ERRORS.TYPE} Number`,
            },
        },
        color: {
            type: 'string',
            errorMessage: {
                type: `${messages_1.VALIDATION_ERRORS.TYPE} String`,
            },
        },
        model: {
            type: 'string',
            errorMessage: {
                type: `${messages_1.VALIDATION_ERRORS.TYPE} String`,
            },
        },
        category: {
            type: 'string',
            errorMessage: {
                type: `${messages_1.VALIDATION_ERRORS.TYPE} String`,
            },
        },
        year: {
            type: 'number',
            errorMessage: {
                type: `${messages_1.VALIDATION_ERRORS.TYPE} Number`,
            },
        },
        fuel: {
            type: 'string',
            errorMessage: {
                type: `${messages_1.VALIDATION_ERRORS.TYPE} String`,
            },
        },
        transmission: {
            type: 'string',
            errorMessage: {
                type: `${messages_1.VALIDATION_ERRORS.TYPE} String`,
            },
        },
        seats: {
            type: 'number',
            errorMessage: {
                type: `${messages_1.VALIDATION_ERRORS.TYPE} Number`,
            },
        },
        colors: {
            type: 'array',
            items: {
                type: 'string',
            },
            errorMessage: {
                type: `${messages_1.VALIDATION_ERRORS.TYPE} Array`,
            },
        }
    },
    required: ["name", "images", "description", "price", "status"],
    additionalProperties: false
};
exports.validateCar = ajv.compile(carSchema);
