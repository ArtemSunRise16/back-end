"use strict";

const Sequelize = require("sequelize");
const config = require("../config/config.js");

let sequelize;

sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: "postgres",
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false,
    //   },
    // },
  }
);

module.exports = { sequelize };
