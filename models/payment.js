const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const Payment = sequelize.define(
  "payment",
  {
    // Model attributes are defined here
    payment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    customer_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    staff_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    rental_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    payment_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    modelName: "payment",
    freezeTableName: true,
    timestamps: false,
  }
);
module.exports = Payment;

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true
