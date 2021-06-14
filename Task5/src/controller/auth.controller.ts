import { Request, Response } from 'express';
import { AuthService } from './../service';
import { constructResponse, contructErrorResponse } from "../util";
import { userAuthSchema } from '../schema';
import jwt from 'jsonwebtoken';
import config from './../config/secret.json';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public authenticate = (req: Request, res: Response) => {
        const { error } = userAuthSchema(req);

        if (error) {
            contructErrorResponse(req, res, error, 422);
        }
        else {
            const { name, password } = req.body;

            this.authService
                .authenticate(name, password)
                .then((user: any) => {
                    if (user) {
                        // create a jwt token that is valid for 7 days
                        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
                        return constructResponse(res, token, 'Authenticated', 200);
                    }
                })
                .catch((err: any) => contructErrorResponse(req, res, err, 400, false));
        }

    };
}
