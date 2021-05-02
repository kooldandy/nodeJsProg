import { IGroup } from "../interface";
import { GroupDataAccess } from "./../dao";

export class GroupService {
    private dao: GroupDataAccess;

    constructor() {
        this.dao = new GroupDataAccess();
    }

    public getAllGroups = async (): Promise<IGroup[]> => {

        try {
            const appusers = await this.dao.findAll();
            return appusers;
        } catch (error) {
            return error;
        }
    };

    public getGroupById = async (id: number): Promise<IGroup> => {

        try {
            const appuser = await this.dao.findById(id);
            return appuser;
        } catch (error) {
            return error;
        }
    };

    public createGroup = async (name: string, email: string): Promise<IGroup> => {

        try {
            const result = await this.dao.insert(name, email);
            return result;
        } catch (error) {
            return error;
        }
    };

    public updateGroup = async (id: number, name: string): Promise<boolean> => {

        try {
            const result = await this.dao.update(id, name);
            return result[result.length-1]===1? true: false;
        } catch (error) {
            return error;
        }
    };

    public removeGroupById = async (id: number): Promise<boolean> => {

        try {
            const result = await this.dao.deleteUser(id);
            return result? true: false;
        } catch (error) {
            return error;
        }
    };
}
