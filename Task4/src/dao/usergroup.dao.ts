import { UserGroup } from '../model';

export class UserGroupDataAccess {
    public addUsersToGroup(groupId: string, userIds: number[]):Promise<UserGroup[]> {
        const request = userIds.map(userId => {
            return {
                groupId,
                userId,
            };
        });
        return UserGroup.bulkCreate(request);
    }
}
