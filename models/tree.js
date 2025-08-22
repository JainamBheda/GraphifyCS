const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const TreeNode = sequelize.define("TreeNode", {
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  parent: {
    type: DataTypes.INTEGER, // optional: parent node id
    allowNull: true,
  },
});

module.exports = TreeNode;
