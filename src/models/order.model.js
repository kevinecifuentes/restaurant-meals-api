const { DataTypes } = require('sequelize')
const { db } = require('./../database/config')

const Order = db.define('orders', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  mealId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    /* field: 'meal_id', */
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    /* field: 'user_id', */
  },
  totalPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
    /* field: 'total_price', */
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'cancelled', 'completed'),
    allowNull: false,
    defaultValue: 'active',
  },
})

module.exports = { Order }
