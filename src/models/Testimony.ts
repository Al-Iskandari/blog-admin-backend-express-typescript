import { DataType,DataTypes,Model,Optional } from "sequelize";
import connection from "../config/dbConnect";

interface TestimonyAttributes {
  id?: number,
  userId?: number,
  serviceId?: number,
  product_image?: string | null,
  customer?: string | null,
  customer_company?: string | null,
  customer_image?: string | null,
  statement?: string | null,
  rating?: number,

  createdAt?: Date | null,
  updatedAt?: Date | null,
}

export interface TestimonyInput extends Optional<TestimonyAttributes, 'id'> { }
export interface TestimonyOutput extends Required<TestimonyAttributes> { }

class Testimony extends Model<TestimonyAttributes, TestimonyInput> implements TestimonyAttributes {
  public id!: number;
  public userId!: number;
  public serviceId!: number;
  public product_image!: string | null;
  public customer!: string | null;
  public customer_company!: string | null;
  public customer_image!: string | null;
  public statement!: string | null;
  public rating!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Testimony.init({
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
  product_image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customer: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customer_company: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customer_image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  statement: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  timestamps: true,
  sequelize: connection,
});

export default Testimony;