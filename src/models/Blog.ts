import { DataType,DataTypes,Model,Optional } from "sequelize";
import connection from "../config/dbConnect";


interface BlogAttributes{
  id?: number,
  userId?: number,
  serviceId?: number,
  title?: string | null,
  content?: string | null,
  image?: string | null,
  tag?: string | null,
  slug?: string | null,
  createdAt?: Date | null,
  updatedAt?: Date | null,
}

export interface BlogInput extends Optional<BlogAttributes, 'id'>{ }
export interface BlogOutput extends Required<BlogAttributes>{ } 


class Blog extends Model<BlogAttributes, BlogInput> implements BlogAttributes {
  public id!: number;
  public userId!: number;
  public serviceId!: number;
  public title!: string;
  public content!: string;
  public image!: string;
  public tag!: string;
  public slug!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Blog.init({
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
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tag: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},{
  timestamps: true,
  sequelize: connection,
  tableName: 'Blogs',
  underscored: false,
});

export default Blog;
