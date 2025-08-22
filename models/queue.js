const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Queue = sequelize.define('queue', {
    operation: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Queue;
