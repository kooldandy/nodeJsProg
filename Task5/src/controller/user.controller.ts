import { Request, Response } from "express";
import { UserService } from "./../service";


export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public getAllUsers = (req: Request, res: Response) => {
        this.userService.getAllUsers()
            .then((appusers: any) => res.status(200).send(appusers))
            .catch((error: any) => res.status(400).send(error))
    };

    public getUserById = (req: Request, res: Response) => {
        const id = parseInt(req.params.userId, 10);
        this.userService.getUserById(id)
            .then((appuser: any) => res.status(200).send(appuser))
            .catch((error: any) => res.status(400).send(error))
    };

    public createUser = (req: Request, res: Response) => {
        const body = req.body;
        this.userService.createUser(body.username, body.email)
            .then((result: any) => res.status(200).send(result))
            .catch((error: any) => res.status(400).send(error))
    };

    public updateUser = (req: Request, res: Response) => {
        const { params, body } = req;
        const id = parseInt(params.userId, 10);
        const username = body.username;

        this.userService.updateUser(id, username)
            .then((result: any) => res.status(200).send(result))
            .catch((error: any) => res.status(400).send(error))
    };

    public removeUserById = (req: Request, res: Response) => {
        const id = parseInt(req.params.userId, 10);

        this.userService.removeUserById(id)
            .then((appusers: any) => res.status(200).send(appusers))
            .catch((error: any) => res.status(400).send(error))
    };

    private constructResponse(result: any) {
        // res.json({
        //     status: 'success',
        //     message: 'User created successfully',
        //     data: Object.assign({ id }, value)
        // });
        // return response;
    }
}
