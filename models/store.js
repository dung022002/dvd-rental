const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const Store = sequelize.define(
  "store",
  {
    // Model attributes are defined here
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    manager_staff_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    address_id: {
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
    // Other model options go here
    modelName: "store",
    freezeTableName: true,
    timestamps: false,
  }
);
module.exports = Store;

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true
