import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import { IUserAttributes, UserRole } from "../types";

type UserCreationAttributes = Optional<
  IUserAttributes,
  "id" | "createdAt" | "updatedAt"
>;

export class User
  extends Model<IUserAttributes, UserCreationAttributes>
  implements IUserAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public passwordHash!: string;
  public role!: UserRole;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("CLIENT", "SUPPORT", "ADMIN"),
      allowNull: false,
      defaultValue: "CLIENT",
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  },
);
