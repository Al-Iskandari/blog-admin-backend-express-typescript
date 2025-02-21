import { DataType,DataTypes,Model,Optional } from "sequelize";
import connection from "../config/dbConnect";


interface AboutAttributes{
  id?: number,
  userId?: number,
  about?: string | null,
  image?: string | null,

  createdAt?: Date | null,
  updatedAt?: Date | null,
}

export interface AboutInput extends Optional<AboutAttributes, 'id'>{ }
export interface AboutOutput extends Required<AboutAttributes>{ }

class About extends Model<AboutAttributes, AboutInput> implements AboutAttributes {
  public id!: number;
  public userId!: number;
  public about!: string;
  public image!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

About.init({
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
  about: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},{
  timestamps: true,
  sequelize: connection,
  tableName: 'Abouts',
  underscored: false,
});

export default About;