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
    protectMiddleware.protect,
    validationMiddlewares.validationCreateRestaurants,
    protectMiddleware.restrictTo('admin'),
    restaurantControllers.createRestaurant
  )
  .get(protectMiddleware.protect, restaurantControllers.findAllRestaurants);

router.use(protectMiddleware.protect);

router
  .route('/:id')
  .get(
    restaurantMiddlewares.validRestaurant,
    restaurantControllers.findOneRestaurants
  )
  .patch(
    validationMiddlewares.validationUpdateRestaurants,
    protectMiddleware.restrictTo('admin'),
    restaurantMiddlewares.validRestaurant,
    restaurantControllers.updateRestaurant
  )
  .delete(
    restaurantMiddlewares.validRestaurant,
    protectMiddleware.restrictTo('admin'),
    restaurantControllers.deleteRestaurant
  );

//create reviews
router
  .route('/reviews/:id')
  .post(restaurantControllers.createReviewToRestaurant);

router
  .route('/reviews/:restaurantId/:id')
  .patch(restaurantControllers.updateReviewToRestaurant)
  .delete(restaurantControllers.deleteReviewToRestaurant);

module.exports = router;
