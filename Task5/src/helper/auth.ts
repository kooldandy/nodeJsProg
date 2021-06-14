import expressJwt from 'express-jwt';
import config from '../config/secret.json';


export const jwt = () => {
    const { secret } = config;
    return expressJwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/api/login',
            '/api/user'
        ]
    });
}
