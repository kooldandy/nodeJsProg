import { Router } from 'express';
import { createUserSchema, updateUserSchema } from '../schema';
import { UserController } from './../controller';

export class AppRouter {
    private router: Router;
    private userController: UserController

    constructor() {
        this.router = Router();
        this.userController = new UserController();

        this.setUserRoutes();

        this.setGroupRoutes();
    }

    private setUserRoutes() {
        this.router.get('/user/:userId', this.userController.getUserById);
        this.router.get('/users', this.userController.getAllUsers);
        this.router.post('/user', createUserSchema, this.userController.createUser);
        this.router.put('/user/:userId', updateUserSchema, this.userController.updateUser);
        this.router.delete('/user/:userId', this.userController.removeUserById);
    }

    private setGroupRoutes() {
        this.router.get('/group/:userId', this.userController.getUserById);
        this.router.get('/groups', this.userController.getAllUsers);
        this.router.post('/group', createUserSchema, this.userController.createUser);
        this.router.put('/group/:userId', updateUserSchema, this.userController.updateUser);
        this.router.delete('/group/:userId', this.userController.removeUserById);
    }

    public getRouter = () => this.router;
}
