const dbConfig = require('../config/db.config')
const Sequelize = require('sequelize')
const { DataTypes } = require('sequelize')

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
  }
);

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.Admin = require('./Admin')(sequelize, Sequelize)
db.Blog = require('./Blog')(sequelize, DataTypes)

module.exports = db