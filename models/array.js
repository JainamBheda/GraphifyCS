const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ArrayModel = sequelize.define("Array", {
  index: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  operation: {
    type: DataTypes.STRING,
    allowNull: false, // must be provided
  },
});

module.exports = ArrayModel;
