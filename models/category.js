const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const Category = sequelize.define(
  "category",
  {
    // Model attributes are defined here
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  },
  {
    modelName: "category",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Category;

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true
