const express = require('express');

//middlewares
const restaurantMiddlewares = require('./../middlewares/restaurant.middleware');
const protectMiddleware = require('./../middlewares/protect.middleware');
const validationMiddlewares = require('./../middlewares/validantions.middlewares');

//controllers
const restaurantControllers = require('./../controllers/restaurant.controller');
const reviewMiddlewares = require('./../middlewares/review.middleware');

const router = express.Router();

router
  .route('/')
  .post(
    protectMiddleware.protect,
    validationMiddlewares.validationCreateRestaurants,
    protectMiddleware.restrictTo('admin'),
    restaurantControllers.createRestaurant
  )
  .get(restaurantControllers.findAllRestaurants);

router.use(protectMiddleware.protect);

router
  .route('/:id')
  .get(
    restaurantMiddlewares.validRestaurant,
    restaurantControllers.findOneRestaurants
  )
  .patch(
    protectMiddleware.protect,
    validationMiddlewares.validationUpdateRestaurants,
    protectMiddleware.restrictTo('admin'),
    restaurantMiddlewares.validRestaurant,
    restaurantControllers.updateRestaurant
  )
  .delete(
    protectMiddleware.protect,
    restaurantMiddlewares.validRestaurant,
    protectMiddleware.restrictTo('admin'),
    restaurantControllers.deleteRestaurant
  );

//create reviews
router
  .route('/reviews/:id')
  .post(
    protectMiddleware.protect,
    restaurantControllers.createReviewToRestaurant
  );

router
  .route('/reviews/:restaurantId/:id')
  .patch(
    protectMiddleware.protect,
    reviewMiddlewares.findOneReview,
    restaurantControllers.updateReview
  )
  .delete(
    protectMiddleware.protect,
    reviewMiddlewares.findOneReview,
    restaurantControllers.deleteReview
  );

module.exports = router;
