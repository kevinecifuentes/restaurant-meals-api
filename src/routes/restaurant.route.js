const express = require('express');

//middlewares
const restaurantMiddlewares = require('./../middlewares/restaurant.middleware');
const protectMiddleware = require('./../middlewares/protect.middleware');
const validationMiddlewares = require('./../middlewares/validantions.middlewares');

//controllers
const restaurantControllers = require('./../controllers/restaurant.controller');

const router = express.Router();

router
  .route('/')
  .post(
    protectMiddleware.restrictTo('admin'),
    validationMiddlewares.validationCreateRestaurants,
    restaurantControllers.createRestaurant
  )
  .get(protectMiddleware.protect, restaurantControllers.findAllRestaurants);

router
  .route('/:id')
  .get(
    protectMiddleware.protect,
    restaurantMiddlewares.validRestaurant,
    restaurantControllers.findOneRestaurants
  )
  .patch(
    protectMiddleware.restrictTo('admin'),
    validationMiddlewares.validationUpdateRestaurants,
    restaurantControllers.updateRestaurant
  )
  .delete(
    protectMiddleware.restrictTo('admin'),
    restaurantControllers.deleteRestaurant
  );

router
  .route('/:restaurantId/:id')
  .patch(restaurantControllers.updateReviewToRestaurant)
  .delete(restaurantControllers.deleteReviewToRestaurant);

module.exports = router;
