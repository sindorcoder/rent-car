import {VALIDATION_ERRORS} from "../../errors/messages";
import Ajv, { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';
import ajvErrors from 'ajv-errors';

const ajv = new Ajv({
    allErrors: true,
    verbose: true
});

addFormats(ajv);
ajvErrors(ajv /*,{ singleError: true }*/);

interface CarSchema {
    name: string;
    images: string[];
    description: string;
    price: number;
    status: string;
}

const carSchema: JSONSchemaType<CarSchema> = {
    type: 'object',
    properties: {
        name:  {
            type: 'string',
            minLength: 4,
            maxLength: 20,
            errorMessage: {
                minLength: `${VALIDATION_ERRORS.MIN_LENGTH} 4 character`,
                maxLength: VALIDATION_ERRORS.MAX_LENGTH,
                type: `${VALIDATION_ERRORS.TYPE} String`,
            },
        },
        images: {
            type: 'array',
            items: {
                type: 'string',
            },
            errorMessage: {
                type: `${VALIDATION_ERRORS.TYPE} Array`,
            },
        },
        description: {
            type: 'string',
            minLength: 4,
            maxLength: 2000,
            errorMessage: {
                minLength: `${VALIDATION_ERRORS.MIN_LENGTH} 4 characters`,
                maxLength: VALIDATION_ERRORS.MAX_LENGTH,
                type: `${VALIDATION_ERRORS.TYPE} String`,
            },  
        },
        price: {
            type: 'number',
            errorMessage: {
                type: `${VALIDATION_ERRORS.TYPE} Number`,
            },  
        },
        status: {
            type: 'string',
            enum: ["active", "inactive", "rented"],
            errorMessage: {
                type: `${VALIDATION_ERRORS.TYPE} String`,
            },  
        },
        rent_price: {
            type: 'number',
            errorMessage: {
                type: `${VALIDATION_ERRORS.TYPE} Number`,
            },  
        },
        color: {
            type: 'string',
            errorMessage: {
                type: `${VALIDATION_ERRORS.TYPE} String`,
            },  
        },
        model: {
            type: 'string',
            errorMessage: {
                type: `${VALIDATION_ERRORS.TYPE} String`,
            },  
        },
        category: {
            type: 'string',
            errorMessage: {
                type: `${VALIDATION_ERRORS.TYPE} String`,
            },  
        },
        year: {
            type: 'number',
            errorMessage: {
                type: `${VALIDATION_ERRORS.TYPE} Number`,
            },  
        },
        fuel: {
            type: 'string',
            errorMessage: {
                type: `${VALIDATION_ERRORS.TYPE} String`,
            },  
        },
        transmission: {
            type: 'string',
            errorMessage: {
                type: `${VALIDATION_ERRORS.TYPE} String`,
            },  
        },
        seats: {
            type: 'number',
            errorMessage: {
                type: `${VALIDATION_ERRORS.TYPE} Number`,
            },  
        },
        colors: {
            type: 'array',
            items: {
                type: 'string',
            },
            errorMessage: {
                type: `${VALIDATION_ERRORS.TYPE} Array`,
            },
        },
        thumbnail: {
            type: 'string',
            errorMessage: {
                type: `${VALIDATION_ERRORS.TYPE} String`,
            },  
        },
        discount: {
            type: 'number',
            errorMessage: {
                type: `${VALIDATION_ERRORS.TYPE} Number`,
            },  
        },
        capacity_fuel: {
            type: 'number',
            errorMessage: {
                type: `${VALIDATION_ERRORS.TYPE} Number`,
            },  
        },
        usage_per_km: {
            type: 'number',
            errorMessage: {
                type: `${VALIDATION_ERRORS.TYPE} Number`,
            },  
        },
    },
    required: ["name", "images", "description", "price", "status"],
    additionalProperties: false
}

const updateCarSchema = () : JSONSchemaType<CarSchema> => {
    const updateSchema = { ...carSchema, required: [] };
    return updateSchema;
};

export const validateCar  = ajv.compile(carSchema)
export const validateUpdateCar = ajv.compile(updateCarSchema());