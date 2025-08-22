const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('graphifycs', 'root', '3740', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false , 
});

sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.error('Unable to connect:', err));

module.exports = sequelize;
