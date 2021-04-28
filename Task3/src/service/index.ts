import { IUser } from "../interface/user.interface";
import { DataAccess } from "./../dao";

export class AppService {
    private dao: DataAccess;

    constructor() {
        this.dao = new DataAccess();
    }

    public getAllUsers = async (): Promise<IUser[]> => {

        try {
            const appusers = await this.dao.findAll();
            return appusers;
        } catch (error) {
            return error;
        }
    };

    public getUserById = async (id: number): Promise<IUser> => {

        try {
            const appuser = await this.dao.findById(id);
            return appuser;
        } catch (error) {
            return error;
        }
    };

    public createUser = async (name: string, email: string): Promise<IUser> => {

        try {
            const result = await this.dao.insert(name, email);
            return result;
        } catch (error) {
            return error;
        }
    };

    public updateUser = async (id: number, name: string): Promise<boolean> => {

        try {
            const result = await this.dao.update(id, name);
            return result[result.length-1]===1? true: false;
        } catch (error) {
            return error;
        }
    };

    public removeUserById = async (id: number): Promise<boolean> => {

        try {
            const result = await this.dao.deleteUser(id);
            return result? true: false;
        } catch (error) {
            return error;
        }
    };
}
