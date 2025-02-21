import { DataType,DataTypes,Model,Optional } from "sequelize";
import connection from "../config/dbConnect";

enum StatusType {
  active = 'active',
  inactive = 'inactive',  
}

interface ServiceAttributes {
  id?: number,
  service?: string,
  image?: string,
  status?: StatusType,

  createdAt?: Date | null,
  updatedAt?: Date | null,
}

export interface ServiceInput extends Optional<ServiceAttributes, 'id'> { }
export interface ServiceOutput extends Required<ServiceAttributes> { }

class Service extends Model<ServiceAttributes, ServiceInput> implements ServiceAttributes {
  public id!: number;
  public service!: string;
  public image!: string;
  public status!: StatusType;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Service.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  service: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM,
    values:[...Object.values(StatusType)],
    defaultValue: StatusType.active,
    allowNull: false,
  },
},{
  timestamps: true,
  sequelize: connection,
  tableName: 'Services',
  underscored: false,
});

export default Service;