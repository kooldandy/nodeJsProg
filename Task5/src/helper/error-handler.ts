import { contructErrorResponse } from "../util";
import { NextFunction, Request, Response } from "express";

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {

    if (typeof (error) === 'string') {
        // custom application error
        return contructErrorResponse(req, res, error as any, 400, false);
    }

    if (error.name === 'UnauthorizedError') {
        // jwt authentication error
        error.message = 'Invalid Token';
        return contructErrorResponse(req, res, error , 403, false);
    }

    // default to 500 server error
    return contructErrorResponse(req, res, error , 500, false);
    }