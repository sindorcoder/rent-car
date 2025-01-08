"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
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
const userSchema = {
    type: 'object',
    properties: {
        first_name: {
            type: 'string',
            minLength: 4,
            maxLength: 20,
            errorMessage: {
                minLength: `${messages_1.VALIDATION_ERRORS.MIN_LENGTH} 4 character`,
                maxLength: messages_1.VALIDATION_ERRORS.MAX_LENGTH,
                type: `${messages_1.VALIDATION_ERRORS.TYPE} String`,
            },
        },
        last_name: {
            type: 'string',
            minLength: 4,
            maxLength: 20,
            errorMessage: {
                minLength: `${messages_1.VALIDATION_ERRORS.MIN_LENGTH} 4 characters`,
                maxLength: `${messages_1.VALIDATION_ERRORS.MIN_LENGTH} 10 characters`,
                type: `${messages_1.VALIDATION_ERRORS.TYPE} String`,
            },
        },
        phone_number: {
            type: 'string',
            minLength: 10,
            maxLength: 10,
            errorMessage: {
                minLength: `${messages_1.VALIDATION_ERRORS.MIN_LENGTH} 10 numbers`,
                maxLength: `${messages_1.VALIDATION_ERRORS.MAX_LENGTH} 10 numbers`,
                type: `${messages_1.VALIDATION_ERRORS.TYPE} String`,
            },
        },
        email: {
            type: 'string',
            format: 'email',
            minLength: 4,
            errorMessage: {
                format: `${messages_1.VALIDATION_ERRORS.FORMAT} Email`,
                minLength: `${messages_1.VALIDATION_ERRORS.MIN_LENGTH} 4 characters`,
                type: `${messages_1.VALIDATION_ERRORS.TYPE} String`,
            },
        },
        password: {
            type: 'string',
            pattern: `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})`,
            errorMessage: {
                pattern: `${messages_1.VALIDATION_ERRORS.PATTERN}`,
                type: `${messages_1.VALIDATION_ERRORS.TYPE} String`,
            },
        },
        role: {
            type: 'string',
            nullable: true,
            enum: ['user', 'admin'],
            errorMessage: {
                enum: `${messages_1.VALIDATION_ERRORS.ENUM} ['user', 'admin']`,
                type: `${messages_1.VALIDATION_ERRORS.TYPE} String`,
            },
        },
        context: {
            type: 'string',
            enum: ['create', 'check'],
            errorMessage: {
                enum: `${messages_1.VALIDATION_ERRORS.ENUM} ['create', 'check']`,
                type: `${messages_1.VALIDATION_ERRORS.TYPE} String`,
            },
        }
    },
    required: ['email', 'password'],
    if: {
        properties: {
            context: {
                enum: ["create"]
            }
        }
    },
    then: {
        required: ["first_name"]
    },
    additionalProperties: false,
};
exports.validateUser = ajv.compile(userSchema);
