const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");
const Language = require("./language");

const Film = sequelize.define(
  "film",
  {
    // Model attributes are defined here
    film_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      // allowNull defaults to true
    },
    description: {
      type: DataTypes.TEXT,
    },
    release_year: {
      type: DataTypes.INTEGER,
    },
    language_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    rental_duration: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 3,
    },
    rental_rate: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    length: {
      type: DataTypes.SMALLINT,
    },
    replacement_cost: {
      type: DataTypes.DOUBLE,
      defaultValue: 19.99,
      allowNull: false,
    },
    rating: {
      type: DataTypes.ENUM(["G", "PG", "PG-13", "R", "NC-17"]),
      defaultValue: "G",
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    special_features: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    fulltext: {
      type: DataTypes.TSVECTOR,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    modelName: "film",
    freezeTableName: true,
    timestamps: false,
  }
);

//associate
Language.hasMany(Film, { foreignKey: "language_id" });
Film.belongsTo(Language, { foreignKey: "language_id" });

module.exports = Film;

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true
