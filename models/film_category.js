const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const Film_category = sequelize.define(
  "film_category",
  {
    // Model attributes are defined here
    film_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      primaryKey: true,
    },
    category_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      primaryKey: true,
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

module.exports = Film_category;

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true
