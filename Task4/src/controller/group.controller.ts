import { Request, Response } from "express";
import Joi from "joi";
import { createGroupSchema } from "../schema";
import { GroupService } from "./../service";


export class GroupController {
    private groupService: GroupService;

    constructor() {
        this.groupService = new GroupService();
    }

    public getAllGroups = (req: Request, res: Response) => {
        this.groupService.getAllGroups()
            .then((appusers: any) => this.constructResponse(res, appusers, '', 200))
            .catch((err: any) => this.contructErrorResponse(req, res, err, 400, false))
    };

    public getGroupById = (req: Request, res: Response) => {
        const id = req.params.groupId;
        this.groupService.getGroupById(id)
            .then((appuser: any) => this.constructResponse(res, appuser, '', 200))
            .catch((err: any) => this.contructErrorResponse(req, res, err, 404, false))
    };

    public createGroup = (req: Request, res: Response) => {
        const { error } = createGroupSchema(req);
        if (error) {
            this.contructErrorResponse(req, res, error, 422);
        }
        else {
            const body = req.body;
            this.groupService.createGroup(body.name, body.permissions)
                .then((result: any) => this.constructResponse(res, result, 'Group successufully created', 200))
                .catch((err: any) => this.contructErrorResponse(req, res, err, 400, false));
        }
    };

    public updateGroup = (req: Request, res: Response) => {
        const { error } = createGroupSchema(req);
        if (error) {
            this.contructErrorResponse(req, res, error, 422);
        }
        else {
            const { params, body } = req;
            const id = params.groupId;
            const name = body.name;
            const permissions = body.permissions;

            this.groupService.updateGroup(id, name, permissions)
                .then((appuser: any) => this.constructResponse(res, appuser, 'Group successufully updated', 200))
                .catch((err: any) => this.contructErrorResponse(req, res, err, 404, false))
        }
    };

    public removeGroupById = (req: Request, res: Response) => {
        const id = req.params.groupId;

        this.groupService.removeGroupById(id)
            .then((appuser: any) => this.constructResponse(res, appuser, 'Group deleted updated', 200))
            .catch((err: any) => this.contructErrorResponse(req, res, err, 404, false))
    };

    private constructResponse(res: Response, result: any, message: string, status: number) {
        res
            .status(status)
            .json({
                status: 'success',
                message,
                // data: Object.assign({ id }, result)
                data: result
            });
    }

    private contructErrorResponse(req: Request, res: Response, error: Joi.ValidationError, status: number, isValidation = true) {
        res
            .status(status)
            .json({
                status: 'error',
                message: isValidation
                    ? `Validation error: ${error.details.map((x: Joi.ValidationErrorItem) => x.message).join(', ')}`
                    : error.message,
                data: req.body
            });
    }
}
