import { DataType,DataTypes,Model,Optional } from "sequelize";
import connection from "../config/dbConnect";

enum StatusType {
  active = 'active',
  inactive = 'inactive',  
}

interface SectionAttributes {
  id?: number,
  userId?: number,
  serviceId?: number,
  section?: string,
  status?: StatusType,
  createdAt?: Date;
  updatedAt?: Date
}

export interface SectionInput extends Optional<SectionAttributes, 'id'> { }
export interface SectionOutput extends Required<SectionAttributes> { }



class Section extends Model<SectionAttributes, SectionInput> implements SectionAttributes {
  public id!: number;
  public userId!: number;
  public serviceId!: number;
  public section!: string;
  public status!: StatusType;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Section.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
    allowNull: false,
  },
  serviceId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Services',
      key: 'id',
    },
    allowNull: false,
  },
  section: {
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
  tableName: 'Sections',
  underscored: false,
});

export default Section;