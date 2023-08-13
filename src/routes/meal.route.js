const express = require('express')

//middlewares

//controllers
const mealControllers = require('./../controllers/meal.controller')

const router = express.Router()

router.get('/', mealControllers.finAllMeals)

router
  .route('/:id')
  .post(mealControllers.createMeal)
  .get(mealControllers.finOneMeal)
  .patch(mealControllers.updateMeal)
  .delete(mealControllers.deleteMeal)

module.exports = router
