const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const Language = sequelize.define(
  "language",
  {
    // Model attributes are defined here
    language_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.CHAR(20),
      allowNull: false,
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  },
  {
    // Other model options go here
    modelName: "language",
    freezeTableName: true,
    timestamps: false,
  }
);
module.exports = Language;

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true
