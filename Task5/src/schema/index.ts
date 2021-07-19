import { Request, NextFunction, Response } from 'express';
import Joi from 'joi';

export function createUserSchema(req: Request, res: Response, next: NextFunction) {
    const userSchema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().min(8).max(30).required(),
        password: Joi.string().min(4).max(10).required()
    });
    validateRequest(req, res, next, userSchema);
}

export function updateUserSchema(req: Request, res: Response, next: NextFunction) {
    const userSchemaRules = {
        username: Joi.string().empty(''),
        email: Joi.string().email().empty('')
    };
    const userSchema = Joi.object(userSchemaRules).with('username', 'email');
    validateRequest(req, res, next, userSchema);
}

const validateRequest = (req: Request, res: Response, next: NextFunction, schema: Joi.Schema) => {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);

    if (error) {
        // next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
        res.status(422).json({
            status: 'error',
            message: `Validation error: ${error.details.map((x: Joi.ValidationErrorItem) => x.message).join(', ')}`,
            data: req.body
        });
    } else {
        req.body = value;
        next();
    }
};


export function createGroupSchema(req: Request) {
    const groupSchema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        permissions: Joi.array().min(1).max(6).required()
    });
    return validateRequest1(req, groupSchema);
}

export function addUsersToGroupSchema(req: Request) {
    const groupUserSchema = Joi.object({
        groupId: Joi.string().required(),
        userIds: Joi.array().min(1).required()
    });
    return validateRequest1(req, groupUserSchema);
}

export function userAuthSchema(req: Request) {
    const userAuth = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        password: Joi.string().min(4).max(10).required()
    });
    return validateRequest1(req, userAuth);
}

const validateRequest1 = (req: Request, schema: Joi.Schema) => {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    return schema.validate(req.body, options);
};

