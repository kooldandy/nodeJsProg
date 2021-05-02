import { IGroup } from '../interface';
import { Group } from '../model';

export class GroupDataAccess {

    public findAll(): Promise<IGroup[]> {
        return Group
            .findAll({ include: [{ all: true }] })
    }

    public findById(id: number): Promise<IGroup> {
        return Group
            .findOne({
                where: {
                    id
                }
            })
    }

    public insert(username: string, email: string): Promise<IGroup> {
        return Group
            .create({ username, email })
    }

    public update(user_id: number, value: string): Promise<[number, IGroup[]]> {
        return Group
            .update({
                username: value
            }, {
                where: {
                    user_id,
                }
            });
    }

    public deleteUser(user_id: number): Promise<number> {
        return Group
            .destroy({
                where: {
                    user_id,
                }
            });
    }
}

