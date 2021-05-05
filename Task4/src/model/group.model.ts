import { Permission } from '../enum';
import { DataTypes, Model } from 'sequelize';
import { IGroup } from '../interface';
import { database } from '../db';
import { User, UserGroup } from '.';


export class Group extends Model implements IGroup {
    public id: string;
    public name: string;
    public permissions: Permission[];
}

Group.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        permissions: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        }
    },
    {
        tableName: "nodegroup",
        sequelize: database
    }
);

// Group.belongsToMany(User, {
//     through: UserGroup,
//     foreignKey: 'groupId',
// });

// Group.sync({force: true}).then(() => console.log("Group table created"));
Group.sync().then(() => console.log("Group table created"));
