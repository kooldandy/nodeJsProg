import { Request, Response } from 'express';
import { UserGroupService } from './../service';
import { constructResponse, contructErrorResponse } from "../util";
import { addUsersToGroupSchema } from '../schema';

export class UserGroupController {
  private userGroupService: UserGroupService;

  constructor() {
    this.userGroupService = new UserGroupService();
  }

  public addUsersToGroup = (req: Request, res: Response) => {
    const { error } = addUsersToGroupSchema(req);
    if (error) {
      contructErrorResponse(req, res, error, 422);
    }
    else {
      const { groupId, userIds } = req.body;

      this.userGroupService
        .addUsersToGroup(groupId, userIds)
        .then((users: any) => constructResponse(res, users, 'Users added to group', 200))
        .catch((err: any) => contructErrorResponse(req, res, err, 400, false));
    }

  };
}
