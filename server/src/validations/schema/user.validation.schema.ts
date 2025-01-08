import { VALIDATION_ERRORS } from "../../errors/messages";
import Ajv, { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';
import ajvErrors from 'ajv-errors';

const ajv = new Ajv({
    allErrors: true,
    verbose: true
});

addFormats(ajv);
ajvErrors(ajv /*,{ singleError: true }*/);

interface UserSchema {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    password: string;
}

const userSchema: JSONSchemaType<UserSchema> = {
    type: 'object',
    properties: {
        first_name: {
            type: 'string',
            minLength: 4,
            maxLength: 20,
            errorMessage: {
                minLength: `${VALIDATION_ERRORS.MIN_LENGTH} 4 character`,
                maxLength: VALIDATION_ERRORS.MAX_LENGTH,
                type: `${VALIDATION_ERRORS.TYPE} String`,
            },
        },
        last_name: {
            type: 'string',
            minLength: 4,
            maxLength: 20,
            errorMessage: {
                minLength: `${VALIDATION_ERRORS.MIN_LENGTH} 4 characters`,
                maxLength: `${VALIDATION_ERRORS.MIN_LENGTH} 10 characters`,
                type: `${VALIDATION_ERRORS.TYPE} String`,
            },
        },
        phone_number: {
            type: 'string',
            minLength: 10,
            maxLength: 10,
            errorMessage: {
                minLength: `${VALIDATION_ERRORS.MIN_LENGTH} 10 numbers`,
                maxLength: `${VALIDATION_ERRORS.MAX_LENGTH} 10 numbers`,
                type: `${VALIDATION_ERRORS.TYPE} String`,
            },
        },
        email: {
            type: 'string',
            format: 'email',
            minLength: 4,
            errorMessage: {
                format: `${VALIDATION_ERRORS.FORMAT} Email`,
                minLength: `${VALIDATION_ERRORS.MIN_LENGTH} 4 characters`,
                type: `${VALIDATION_ERRORS.TYPE} String`,
            },
        },
        password: {
            type: 'string',
            pattern: `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})`,
            errorMessage: {
                pattern: `${VALIDATION_ERRORS.PATTERN}`,
                type: `${VALIDATION_ERRORS.TYPE} String`,
            },
        },
        role: {
            type: 'string',
            nullable: true,
            enum: ['user', 'admin'],
            errorMessage: {
                enum: `${VALIDATION_ERRORS.ENUM} ['user', 'admin']`,
                type: `${VALIDATION_ERRORS.TYPE} String`,
            },
        },
        balance : {
            type: 'number',
            nullable: true,
            errorMessage: {
                type: `${VALIDATION_ERRORS.TYPE} Number`
            },
        },
        context: {
            type: 'string',
            enum: ['create', 'check'],
            errorMessage: {
                enum: `${VALIDATION_ERRORS.ENUM} ['create', 'check']`,
                type: `${VALIDATION_ERRORS.TYPE} String`,
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


const updateSchema = {
    ...userSchema, required: [],
     if: {
        properties: {
            context: {
                enum: ["create"]
            }
        }
    },
    then: {
        required: []
    },
    additionalProperties: true,
};

export const validateUser = ajv.compile(userSchema)

export const validateUpdateUser = ajv.compile(updateSchema)