const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const Inventory = sequelize.define(
  "inventory",
  {
    // Model attributes are defined here
    inventory_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    film_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    store_id: {
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
  }
);

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true
