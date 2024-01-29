import { Sequelize } from "sequelize";

const sequelize = new Sequelize('stelle_v1', 'root', 'mysql2023', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '-05:00'
});

export default sequelize;