import { IUser } from "../interface";
import { UserDataAccess } from "./../dao";

export class UserService {
    private dao: UserDataAccess;

    constructor() {
        this.dao = new UserDataAccess();
    }

    public getAllUsers = async (): Promise<IUser[]> => {

        try {
            const appusers = await this.dao.findAll();
            return appusers;
        } catch (error) {
            throw new Error(error);
        }
    };

    public getUserById = async (id: number): Promise<IUser> => {

        try {
            const appuser = await this.dao.findById(id);
            return appuser;
        } catch (error) {
            throw new Error(error);
        }
    };

    public createUser = async (name: string, email: string): Promise<IUser> => {

        try {
            const result = await this.dao.insert(name, email);
            return result;
        } catch (error) {
            throw new Error(error);
        }
    };

    public updateUser = async (id: number, name: string): Promise<boolean> => {

        try {
            const result = await this.dao.update(id, name);
            return result[result.length-1]===1? true: false;
        } catch (error) {
            throw new Error(error);
        }
    };

    public removeUserById = async (id: number): Promise<boolean> => {

        try {
            const result = await this.dao.deleteUser(id);
            return result? true: false;
        } catch (error) {
            throw new Error(error);
        }
    };
}
