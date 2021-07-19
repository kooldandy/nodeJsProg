import { Model, DataTypes, BuildOptions } from 'sequelize';
import { database } from '../db';
import { Group, User } from './../model';

export class UserGroup extends Model {
    public id: string;
    public userId!: number;
    public groupId!: number;
}

UserGroup.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'user_id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        },
        groupId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Group,
                key: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        },
    },
    {
        tableName: 'nodeusergroup',
        sequelize: database,
    },
);

User.belongsToMany(Group, {
    through: UserGroup,
    as: 'groups',
    foreignKey: 'userId',
  });

Group.belongsToMany(User, {
    through: UserGroup,
    as: 'users',
    foreignKey: 'groupId',
});

UserGroup.sync().then(() => console.log("UserGroup table created"));