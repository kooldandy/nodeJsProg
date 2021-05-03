import { IGroup } from "../interface";
import { GroupDataAccess } from "./../dao";
import { Permission } from "../enum";

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

    public getGroupById = async (id: string): Promise<IGroup> => {

        try {
            const appuser = await this.dao.findById(id);
            return appuser;
        } catch (error) {
            return error;
        }
    };

    public createGroup = async (name: string, permissions: Permission[]): Promise<IGroup> => {
        try {
            const result = await this.dao.insert(name, permissions);
            return result;
        } catch (error) {
            return error;
        }
    };

    public updateGroup = async (id: string, name: string, permissions: Permission[]): Promise<boolean> => {

        try {
            const result = await this.dao.update(id, name, permissions);
            return result[result.length-1]===1? true: false;
        } catch (error) {
            return error;
        }
    };

    public removeGroupById = async (id: string): Promise<boolean> => {

        try {
            const result = await this.dao.deleteById(id);
            return result? true: false;
        } catch (error) {
            return error;
        }
    };
}
