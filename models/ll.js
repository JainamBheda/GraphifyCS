const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const LinkedList = sequelize.define("LinkedList", {
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  operation: {
    type: DataTypes.STRING,
    allowNull: false, // insert, delete
  },
  index: {
    type: DataTypes.INTEGER,
    allowNull: true, // position in list
  },
});

module.exports = LinkedList;
