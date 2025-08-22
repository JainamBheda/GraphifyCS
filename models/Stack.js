const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Stack = sequelize.define('Stack', {
    operation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = Stack;
