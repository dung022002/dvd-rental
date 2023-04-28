const { Sequelize, DataTypes } = require("sequelize");

const { sequelize } = require("../sequelize");

const Actor = sequelize.define(
  "actor",
  {
    // Model attributes are defined here
    actor_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      defaultValue: new Date(),
    },
    first_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      // allowNull defaults to true
    },
    last_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    modelName: "actor",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Actor;

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true
