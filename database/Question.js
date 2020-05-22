const Sequelize = require('sequelize');
const connection = require('./connection');

const Question = connection.define('question', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Question.sync({force: false});

module.exports = Question;