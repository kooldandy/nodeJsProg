import { Request, Response } from "express";
import { AppService } from "./../service";


export class AppController {
    private appService: AppService;

    constructor() {
        this.appService = new AppService();
    }

    public getAllUsers = (req: Request, res: Response) => {
        this.appService.getAllUsers()
            .then((appusers: any) => res.status(200).send(appusers))
            .catch((error: any) => res.status(400).send(error))
    };

    public getUserById = (req: Request, res: Response) => {
        const id = parseInt(req.params.userId, 10);
        this.appService.getUserById(id)
            .then((appuser: any) => res.status(200).send(appuser))
            .catch((error: any) => res.status(400).send(error))
    };

    public createUser = (req: Request, res: Response) => {
        const body = req.body;
        this.appService.createUser(body.name, body.email)
            .then((result: any) => res.status(200).send(result))
            .catch((error: any) => res.status(400).send(error))
    };

    public updateUser = (req: Request, res: Response) => {
        const { params, body } = req;
        const id = parseInt(params.userId, 10);
        const name = body.name;

        this.appService.updateUser(id, name)
            .then((result: any) => res.status(200).send(result))
            .catch((error: any) => res.status(400).send(error))
    };

    public removeUserById = (req: Request, res: Response) => {
        const id = parseInt(req.params.userId, 10);

        this.appService.removeUserById(id)
            .then((appusers: any) => res.status(200).send(appusers))
            .catch((error: any) => res.status(400).send(error))
    };

    private constructResponse(result: any) {
        const response = {
            result,
            error: ''
        }
        return response;
    }
}