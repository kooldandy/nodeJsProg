import { Model, DataTypes } from "sequelize";
import { database } from "../db";

export class User extends Model {
  public user_id!: number;
  public username!: string;
  public email!: string;
  public password: string;
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
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: "nodeuser",
    sequelize: database,
  }
);

// Below code is the delete the table data and recreate
// User.sync({ force: true }).then(() => console.log("User table created"));

User.sync({}).then(() => console.log("User table created"));

