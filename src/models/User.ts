import { DataType,DataTypes,Model,Optional } from "sequelize";
import connection from "../config/dbConnect";

interface UserAttributes {
  id?: number,
  firstName?: string | null,
  lastName?: string | null,
  email?: string | null,
  
  createdAt?: Date | null,
  updatedAt?: Date | null,
}

export interface UserInput extends Optional<UserAttributes, 'id'>{ }
export interface UserOutput extends Required<UserAttributes>{ }

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
};

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
},{
  timestamps:true,
  sequelize: connection,
  tableName: 'Users',
  underscored: false,
});

export default User;