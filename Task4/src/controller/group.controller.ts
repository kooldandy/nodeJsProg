import { Request, Response } from "express";
import { GroupService } from "./../service";


export class GroupController {
    private groupService: GroupService;

    constructor() {
        this.groupService = new GroupService();
    }

    public getAllGroups = (req: Request, res: Response) => {
        this.groupService.getAllGroups()
            .then((appusers: any) => res.status(200).send(appusers))
            .catch((error: any) => res.status(400).send(error))
    };

    public getGroupById = (req: Request, res: Response) => {
        const id = req.params.groupId;
        this.groupService.getGroupById(id)
            .then((appuser: any) => res.status(200).send(appuser))
            .catch((error: any) => res.status(400).send(error))
    };

    public createGroup = (req: Request, res: Response) => {
        const body = req.body;
        this.groupService.createGroup(body.name, body.permissions)
            .then((result: any) => res.status(200).send(result))
            .catch((error: any) => res.status(400).send(error))
    };

    public updateGroup = (req: Request, res: Response) => {
        const { params, body } = req;
        const id = params.groupId;
        const name = body.name;
        const permissions = body.permissions;

        this.groupService.updateGroup(id, name, permissions)
            .then((result: any) => res.status(200).send(result))
            .catch((error: any) => res.status(400).send(error))
    };

    public removeGroupById = (req: Request, res: Response) => {
        const id = req.params.groupId;

        this.groupService.removeGroupById(id)
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
