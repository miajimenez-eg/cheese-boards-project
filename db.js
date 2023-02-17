const path = require('path');
const { Sequelize, Model } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, "db.sqlite")
})

// const { sync } = sequelize;

module.exports = {sequelize, Sequelize};