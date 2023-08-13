const { Meal } = require('./meal.model')
const { Order } = require('./order.model')
const { Restaurant } = require('./restaurant.model')
const { Review } = require('./review.model')
const User = require('./user.model')

const initModel = () => {
  User.hasMany(Order, { foreignKey: 'userId' })
  Order.belongsTo(User, { foreignKey: 'userId' })

  Order.hasOne(Meal, { foreignKey: 'id' })
  Meal.hasOne(Order, { foreignKey: 'mealId' })

  Restaurant.hasMany(Meal, { foreignKey: 'restaurantId' })
  Meal.belongsTo(Restaurant, { foreignKey: 'restaurantId' })

  User.hasMany(Review, { foreignKey: 'userId' })
  Review.belongsTo(User, { foreignKey: 'userId' })

  Restaurant.hasMany(Review, { foreignKey: 'restaurantId' })
  Review.belongsTo(Restaurant, { foreignKey: 'restaurantId' })
}

module.exports = initModel
