const { Datatypes, DataTypes } = require('sequelize')
const { db } = require('../database/config')

const Review = db.define('reviews', {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: Datatypes.INTEGER,
  },

  userId: {
    type: Datatypes.INTEGER,
    allowNull: fasle,
  },
  comment: {
    type: Datatypes.TEXT,
    allowNull: false,
  },
  restauranId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  rating: {
    type: Datatypes.INTEGER,
    allowNull: false,
  },
})

module.exports = Review
