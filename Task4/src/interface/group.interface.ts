import { Permission } from "./../enum";

export default interface IGroup {
    id: string,
    name: string,
    permissions: Permission[]
}
