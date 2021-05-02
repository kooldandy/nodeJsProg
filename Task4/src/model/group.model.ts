import { Permission } from '../enum';
import { DataTypes, Model } from 'sequelize';
import { IGroup } from '../interface';
import { database } from '../db';


export class Group extends Model implements IGroup {
    public id: string;
    public name: string;
    public permissions: Permission[];
}

Group.init(
    {
        id:{
            type: new DataTypes.STRING(128),
            primaryKey: true,
        },
        name:{
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        permissions:{
            type: new DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        }
    },
    {
        tableName: "nodegroup",
        sequelize: database
    }
);

// Group.sync({ force: true }).then(() => console.log("Group table created"));
