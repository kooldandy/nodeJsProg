import { Request, Response } from "express";
import { constructResponse, contructErrorResponse } from "../util";
import { UserService } from "./../service";


export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public getAllUsers = (req: Request, res: Response) => {
        this.userService.getAllUsers()
            .then((appusers: any) => constructResponse(res, appusers, '', 200))
            .catch((error: any) => contructErrorResponse(req, res, error, 400, false))
    };

    public getUserById = (req: Request, res: Response) => {
        const id = parseInt(req.params.userId, 10);
        this.userService.getUserById(id)
            .then((appuser: any) => constructResponse(res, appuser, '', 200))
            .catch((error: any) => contructErrorResponse(req, res, error, 404, false))
    };

    public createUser = (req: Request, res: Response) => {
        const body = req.body;
        this.userService.createUser(body.username, body.email)
            .then((result: any) => constructResponse(res, result, 'User successufully created', 200))
            .catch((error: any) => contructErrorResponse(req, res, error, 400, false))
    };

    public updateUser = (req: Request, res: Response) => {
        const { params, body } = req;
        const id = parseInt(params.userId, 10);
        const username = body.username;

        this.userService.updateUser(id, username)
            .then((result: any) => constructResponse(res, result, 'User successufully updated', 200))
            .catch((error: any) => contructErrorResponse(req, res, error, 404, false))
    };

    public removeUserById = (req: Request, res: Response) => {
        const id = parseInt(req.params.userId, 10);

        this.userService.removeUserById(id)
            .then((appuser: any) => constructResponse(res, appuser, 'User deleted updated', 200))
            .catch((error: any) => contructErrorResponse(req, res, error, 404, false))
    };
}
