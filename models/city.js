const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const City = sequelize.define(
  "city",
  {
    // Model attributes are defined here
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: false,
      // allowNull defaults to true
    },
    country_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  },
  {
    modelName: "city",
    freezeTableName: true,
    timestamps: false,
  }
);
module.exports = City;

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true
