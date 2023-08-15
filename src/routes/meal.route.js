const express = require('express');

//middlewares
const mealMiddleware = require('./../middlewares/meal.middleawre');
const protectMiddleware = require('./../middlewares/protect.middleware');
const validationsMiddleware = require('./../middlewares/validantions.middlewares');

//controllers
const mealControllers = require('./../controllers/meal.controller');

const router = express.Router();

router.get('/', mealControllers.finAllMeals);

router
  .route('/:id')
  .post(
    protectMiddleware.protect,
    validationsMiddleware.validationCreateMeals,
    protectMiddleware.restrictTo('admin'),
    mealControllers.createMeal
  )
  .get(mealMiddleware.validMeal, mealControllers.finOneMeal)
  .patch(
    protectMiddleware.protect,
    validationsMiddleware.validationUpdateMeals,
    mealMiddleware.validMeal,
    protectMiddleware.restrictTo('admin'),
    mealControllers.updateMeal
  )
  .delete(
    protectMiddleware.protect,
    mealMiddleware.validMeal,
    protectMiddleware.restrictTo('admin'),
    mealControllers.deleteMeal
  );

module.exports = router;
