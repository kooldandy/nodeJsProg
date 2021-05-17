import { Permission } from "../enum";
import { IGroup } from '../interface';
import { Group } from '../model';

export class GroupDataAccess {

    public findAll(): Promise<IGroup[]> {
        return Group
            .findAll({ include: [{ all: true }] })
    }

    public findById(id: string): Promise<IGroup> {
        return Group
            .findOne({
                where: {
                    id
                }
            })
    }

    public insert(name: string, permissions: Permission[]): Promise<IGroup> {
        return Group
            .create({ name, permissions })
    }

    public update(id: string, name: string, permissions: Permission[]): Promise<[number, IGroup[]]> {
        return Group
            .update({
                name,
                permissions
            }, {
                where: {
                    id,
                }
            });
    }

    public deleteById(id: string): Promise<number> {
        return Group
            .destroy({
                where: {
                    id,
                }
            });
    }
}

