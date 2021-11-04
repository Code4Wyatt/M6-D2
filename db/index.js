
import { Sequelize } from "sequelize";

const { PGDATABASE, PGUSER, PGPASSWORD, PGHOST, PGPORT } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  port: PGPORT,
  dialect: "postgres",
});
console.log("sequelize instnce created");

export const testConnection = async () => {
  try {
    await sequelize.authenticate({ logging: false });
    console.log("Can be established");
  } catch (error) {
    console.log(error);
  }
};

export const connectDB = async () => {
  try {
    console.log("Syncronizes all tables in connectDB"); 
    await sequelize.sync();
  } catch (error) {
    console.log(error);
  }
};

export default sequelize;