const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const Staff = sequelize.define(
  "staff",
  {
    // Model attributes are defined here
    staff_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
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
    modelName: "staff",
    freezeTableName: true,
    timestamps: false,
  }
);
module.exports = Staff;

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true
