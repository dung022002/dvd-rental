const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const Rental = sequelize.define(
  "rental",
  {
    // Model attributes are defined here
    rental_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    rental_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    inventory_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    return_date: {
      type: DataTypes.DATE,
    },
    staff_id: {
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
    modelName: "rental",
    freezeTableName: true,
    timestamps: false,
  }
);
module.exports = Rental;

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true
