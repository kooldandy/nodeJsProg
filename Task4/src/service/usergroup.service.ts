import { UserGroupDataAccess } from './../dao';

export class UserGroupService {
  private dao: UserGroupDataAccess;

  constructor() {
    this.dao = new UserGroupDataAccess();
  }

  public addUsersToGroup = async (groupId: string, usersIds: number[]) => {
    try {
      const result = await this.dao.addUsersToGroup(groupId, usersIds);
      return result;
    } catch (error) {
      return error;
    }
  };
}
