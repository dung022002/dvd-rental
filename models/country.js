const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const Country = sequelize.define(
  "country",
  {
    // Model attributes are defined here
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: false,
      // allowNull defaults to true
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  },
  {
    modelName: "country",
    freezeTableName: true,
    timestamps: false,
  }
);
module.exports = Country;

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true
