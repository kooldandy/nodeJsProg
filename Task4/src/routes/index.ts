import { Router } from 'express';
import { createUserSchema, updateUserSchema } from '../schema';
import { UserController, GroupController } from './../controller';

export class AppRouter {
    private router: Router;
    private userController: UserController;
    private groupController: GroupController;

    constructor() {
        this.router = Router();
        this.userController = new UserController();
        this.groupController = new GroupController();

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
        this.router.get('/group/:groupId', this.groupController.getGroupById);
        this.router.get('/groups', this.groupController.getAllGroups);
        this.router.post('/group', this.groupController.createGroup);
        this.router.put('/group/:groupId', this.groupController.updateGroup);
        this.router.delete('/group/:groupId', this.groupController.removeGroupById);
    }

    public getRouter = () => this.router;
}
