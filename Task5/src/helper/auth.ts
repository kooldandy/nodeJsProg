import { NextFunction, Request, Response } from 'express';
import expressJwt from 'express-jwt';
import jwt from 'jsonwebtoken';
import config from '../config/secret.json';
import Url from 'url';

export const appJwt = (req: Request, res: Response, next: NextFunction) => {

    const parsed_url = Url.parse(req.url, true);

    const token = (req.body && req.body.access_token) || parsed_url.query.access_token || req.headers["x-access-token"];

    const secret = config.secret;

    expressJwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/api/login',
        ]
    });

    if (token) {
        jwt.verify(token, config.secret, { algorithms: ["HS256"] }, (err: Error, decoded: any) => {
            if (err) {
                err = {
                    name: 'UnauthorizedError',
                    message: 'jwt malformed'
                }
            } else {
                // tslint:disable-next-line:no-string-literal
                req.headers['ID'] = decoded.sub;
                next();
            }
        });
    } else {
        throw new Error('UnauthorizedError');
    }

}


export const appJwtFilter = () => {
    const secret = config.secret
    return expressJwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/api/login',
        ]
    });
}
