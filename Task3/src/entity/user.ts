import { Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../db";

export class User extends Model {
  public user_id!: number;
  public username!: string;
  public email!: string;
  public readonly last_login!: Date;
}

User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: "nodeuser",
    sequelize: database,
  }
);

// User.sync({ force: true }).then(() => console.log("Node table created"));


export function findAll(): Promise<any> {
  return User
    .findAll({ include: [{ all: true }] })
}

export function findById(user_id: number): Promise<any> {
  return User
    .findAll({
      where: {
        user_id
      }
     })
}

export function insert(username: string,email: string): Promise<any> {
  return User
    .create({ username, email })
}

export function update(user_id: number, value: string): Promise<any> {
  return User
    .update({
      username: value
    },{
      where: {
        user_id,
      }
     });
}


export function deleteUser(user_id: number): Promise<any> {
  return User
    .destroy({
      where: {
        user_id,
      }
     });
}
