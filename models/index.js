const dbConfig = require('../config/db.config')
const Sequelize = require('sequelize')

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

module.exports = db