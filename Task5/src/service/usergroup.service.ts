import { UserGroup } from '../model';
import { UserGroupDataAccess } from './../dao';

export class UserGroupService {
  private dao: UserGroupDataAccess;

  constructor() {
    this.dao = new UserGroupDataAccess();
  }

  public addUsersToGroup = async (groupId: string, usersIds: number[]):Promise<UserGroup[]> => {
    try {
      const result = await this.dao.addUsersToGroup(groupId, usersIds);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
}
