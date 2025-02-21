import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbName = process.env.DB_DATABASE as string;
const dbUser = process.env.DB_USER as string;
const dbPass = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbDialect = "mysql";


const connection = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: dbDialect,
});

export default connection;