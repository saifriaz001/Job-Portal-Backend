import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // load env variables

const sequelize = new Sequelize(process.env.SQL_URL, {
  dialect: "mysql",
  logging: false,
});

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully!");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
};

export { sequelize, connection };
