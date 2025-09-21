import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,      // Database name
  process.env.DB_USER,      // DB username
  process.env.DB_PASSWORD,  // DB password
  {
    host: process.env.DB_HOST, // DB host
    dialect: process.env.DB_DIALECT || "mysql", // Default mysql
    logging: false, // Disable logging SQL queries
  }
);

export default sequelize;
