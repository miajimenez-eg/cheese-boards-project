const {sequelize} = require('../db.js');
const { Sequelize } = require('sequelize');

let Cheese = sequelize.define('cheese', {
    title: Sequelize.STRING,
    description: Sequelize.STRING
})

module.exports = {Cheese};