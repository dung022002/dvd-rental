const { Sequelize, DataTypes, NOW } = require("sequelize");
const { sequelize } = require("../sequelize");

const Address = sequelize.define(
  "address",
  {
    // Model attributes are defined here
    address_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    address: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    address2: {
      type: DataTypes.STRING(50),
    },
    district: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    city_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    postal_code: {
      type: DataTypes.STRING(10),
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  },
  {
    modelName: "address",
    freezeTableName: true,
    timestamps: false,
  }
);
module.exports = Address;

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true
