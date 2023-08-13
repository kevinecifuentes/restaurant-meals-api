const { Meal } = require('../models/meal.model')
const catchAsync = require('../utils/catchAsync')
const { Restaurant } = require('./../models/restaurant.model')

//create a restaurant
exports.createRestaurant = catchAsync(async (req, res) => {
  const { name, address, rating } = req.body

  const restaurant = await Restaurant.create({ name, address, rating })

  res.status(200).json({
    status: 'success',
    message: `restaurant ${name} has been created`,
    restaurant,
  })
})

//find all restaurants
exports.findAllRestaurants = catchAsync(async (req, res) => {
  const restaurants = await Restaurant.findAll({
    where: {
      status: 'active',
    },
    include: [
      {
        model: Meal,
      }
    ]
  })

  res.status(200).json({
    status: 'success',
    restaurants,
  })
})

//find a restaurant
exports.findOneRestaurants = catchAsync(async (req, res) => {})

//update a review for a restuarant
exports.updateReviewToRestaurant = catchAsync(async (req, res) => {})

//update a restaurant
exports.updateRestaurant = catchAsync(async (req, res) => {})

//delete a review reataurant
exports.deleteReviewToRestaurant = catchAsync(async (req, res) => {})

//delete a restaurant
exports.deleteRestaurant = catchAsync(async (req, res) => {})
