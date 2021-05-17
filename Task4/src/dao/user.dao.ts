import { IUser } from '../interface';
import { User } from '../model';

export class UserDataAccess {

    public findAll(): Promise<IUser[]> {
        return User
            .findAll({ include: [{ all: true }] })
    }

    public findById(user_id: number): Promise<IUser> {
        return User
            .findOne({
                where: {
                    user_id
                }
            })
    }

    public insert(username: string, email: string): Promise<IUser> {
        return User
            .create({ username, email })
    }

    public update(user_id: number, value: string): Promise<[number, IUser[]]> {
        return User
            .update({
                username: value
            }, {
                where: {
                    user_id,
                }
            });
    }

    public deleteUser(user_id: number): Promise<number> {
        return User
            .destroy({
                where: {
                    user_id,
                }
            });
    }
}

