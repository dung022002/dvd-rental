const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("dvd rental", "postgres", "02102002", {
  query: { raw: true },
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = { sequelize };
