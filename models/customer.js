const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const Customer = sequelize.define(
  "customer",
  {
    // Model attributes are defined here
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    store_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      // allowNull defaults to true
    },
    first_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
    },
    address_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    activebool: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    create_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    last_update: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    active: {
      type: DataTypes.INTEGER,
    },
  },
  {
    modelName: "customer",
    freezeTableName: true,
    timestamps: false,
  }
);
module.exports = Customer;

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true
