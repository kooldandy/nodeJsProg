import { Request, NextFunction, Response } from 'express';
import Joi from 'joi';

export function createUserSchema(req: Request, res: Response, next: NextFunction) {
    const userSchema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().min(8).max(30).required()
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

const validateRequest = (req: Request, res: Response, next: NextFunction, schema: any) => {
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
            message: `Validation error: ${error.details.map((x: Error) => x.message).join(', ')}`,
            data: req.body
        });
    } else {
        req.body = value;
        next();
    }
};

