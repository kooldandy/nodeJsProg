import Joi from "joi";
import { Request, Response } from "express";

export const constructResponse = (res: Response, result: any, message: string, status: number) => {
    res
        .status(status)
        .json({
            status: 'success',
            message,
            // data: Object.assign({ id }, result)
            data: result
        });
}

export const contructErrorResponse = (req: Request, res: Response, error: Joi.ValidationError, status: number, isValidation = true) =>{
    res
        .status(status)
        .json({
            status: 'error',
            message: isValidation
                ? `Validation error: ${error.details.map((x: Joi.ValidationErrorItem) => x.message).join(', ')}`
                : error.message,
            data: req.body
        });
}