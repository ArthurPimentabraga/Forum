const Sequelize = require('sequelize');

const connection = new Sequelize('forum', 'root', '135531AA', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;