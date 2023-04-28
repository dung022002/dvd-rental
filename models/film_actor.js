const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const Film_actor = sequelize.define(
  "film_actor",
  {
    // Model attributes are defined here
    actor_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      primaryKey: true,
    },
    film_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      // allowNull defaults to true
    },
    last_update: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
  },
  {
    modelName: "film_actor",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Film_actor;

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true
