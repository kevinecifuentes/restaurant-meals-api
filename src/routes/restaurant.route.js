const express = require('express')

//middlewares

//controllers
const restaurantControllers = require('./../controllers/restaurant.controller')

const router = express.Router()

router
  .route('/')
  .post(restaurantControllers.createRestaurant)
  .get(restaurantControllers.findAllRestaurants)

router
  .route('/:id')
  .get(restaurantControllers.findOneRestaurants)
  .patch(restaurantControllers.updateRestaurant)
  .delete(restaurantControllers.deleteRestaurant)

router
  .route('/:restaurantId/:id')
  .patch(restaurantControllers.updateReviewToRestaurant)
  .delete(restaurantControllers.deleteReviewToRestaurant)

module.exports = router
