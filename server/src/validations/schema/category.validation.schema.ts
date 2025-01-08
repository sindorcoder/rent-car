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

interface CategorySchema {
    name: string;
    image: string;
    status: string;
}

const categorySchema: JSONSchemaType<CategorySchema> = {
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
        image: {
            type: 'string',
            errorMessage: {
                type: `${VALIDATION_ERRORS.TYPE} String`,
            },
        },
        status: {
            type: 'string',
            enum: ["active", "inactive"],
            errorMessage: { 
                enum: `${VALIDATION_ERRORS.ENUM} ["active", "inactive"]`,
            },  
        },
    },
    required: ['name', 'image', 'status'],
    additionalProperties: false
};

const updateCategorySchema = () : JSONSchemaType<CategorySchema> => {
    const updateSchema = { ...categorySchema, required: [] };
    return updateSchema;
};

export const validateCategory = ajv.compile(categorySchema)
export const validateUpdateCategory = ajv.compile(updateCategorySchema())