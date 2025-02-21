import { DataType,DataTypes,Model,Optional } from "sequelize";
import connection from "../config/dbConnect";
    
  
  interface TodoAttributes{
    id?: number,
    userId?: number,
    todo?: string | null,
    status?: boolean | null,
    due?: Date | null,
  
    createdAt?: Date | null,
    updatedAt?: Date | null,
  }
  
  export interface TodoInput extends Optional<TodoAttributes, 'id'>{ }
  export interface TodoOutput extends Required<TodoAttributes>{ }
  
  class Todo extends Model<TodoAttributes, TodoInput> implements TodoAttributes {
    public id!: number;
    public userId!: number;
    public todo!: string;
    public status!: boolean;
    public due!: Date;
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  Todo.init({
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
    todo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    due: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  },
  {
  timestamps: true,
  sequelize: connection,
  tableName: 'Todos',
  underscored: false,
  }
);
  
export default Todo;