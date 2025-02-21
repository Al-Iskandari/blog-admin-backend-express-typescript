import { DataType,DataTypes,Model,Optional } from "sequelize";
import connection from "../config/dbConnect";

enum StatusType {
  active = 'active',
  pending = 'pending',
  cancelled = 'cancelled',
  inactive = 'inactive',
}

interface ProjectAttributes {
  id?: number,
  userId?: number,
  serviceId?: number,
  project_name?: string | null,
  progress?: number,
  customer?: string | null,
  budget_plan?: string | null,
  status?: StatusType,
  createdAt?: Date | null,
  updatedAt?: Date | null,
}

export interface ProjectInput extends Optional<ProjectAttributes, 'id'> { }
export interface ProjectOutput extends Required<ProjectAttributes> { }

class Project extends Model<ProjectAttributes, ProjectInput> implements ProjectAttributes {
  public id!: number;
  public userId!: number;
  public serviceId!: number;
  public project_name!: string | null;
  public progress!: number;
  public customer!: string | null;
  public budget_plan!: string | null;
  public status!: StatusType;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Project.init({
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
  project_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  progress: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  customer: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  budget_plan: {
    type: DataTypes.STRING,
    allowNull: true,
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
  tableName: 'Projects',
  underscored: false,
});

export default Project;