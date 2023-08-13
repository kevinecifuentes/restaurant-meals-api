const catchAsync = require('../utils/catchAsync')
const { Meal } = require('./../models/meal.model')
const { Restaurant } = require('./../models/restaurant.model')

//add new meal to a restaurant
exports.createMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params

  const { name, price, restaurantId = id } = req.body

  const meal = await Meal.create({ name, price, restaurantId })

  return res.status(200).json({
    status: 'success',
    message: 'meal has been created',
    meal,
  })
})

//get all meals
exports.finAllMeals = catchAsync(async (req, res, next) => {
  const meals = await Meal.findAll({
    where: {
      status: 'active',
    },
    include: [
      {
        model: Restaurant,
      },
    ],
  })

  return res.status(200).json({
    status: 'success',
    meals,
  })
})

//get one meal
exports.finOneMeal = catchAsync((req, res, next) => {})

//update one meal
exports.updateMeal = catchAsync((req, res, next) => {})

//delete one meal
exports.deleteMeal = catchAsync((req, res, next) => {})
