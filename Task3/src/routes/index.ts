import { Router } from 'express';
import { createUserSchema, updateUserSchema } from '../schema';
import { AppController } from './../controller';

export class AppRouter {
    private router: Router;
    private appController: AppController

    constructor() {
        this.router = Router();
        this.appController = new AppController();

        this.setAppRoutes();
    }

    private setAppRoutes() {
        this.router.get('/user/:userId', this.appController.getUserById);
        this.router.get('/users', this.appController.getAllUsers);
        this.router.post('/user', createUserSchema, this.appController.createUser);
        this.router.put('/user/:userId', updateUserSchema, this.appController.updateUser);
        this.router.delete('/user/:userId', this.appController.removeUserById);
    }

    public getRouter = () => this.router;
}
