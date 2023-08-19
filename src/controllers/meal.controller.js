/* const AppError = require('../utils/appError') */
const catchAsync = require('../utils/catchAsync');
const { Meal } = require('./../models/meal.model');
const { Restaurant } = require('./../models/restaurant.model');

//add new meal to a restaurant
exports.createMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const { name, price, restaurantId = id } = req.body;

  const meal = await Meal.create({ name, price, restaurantId });

  return res.status(200).json({
    status: 'success',
    message: 'meal has been created',
    restaurantId,
    meal,
  });
});

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
  });

  return res.status(200).json({
    status: 'success',
    meals,
  });
});

//get one meal
exports.finOneMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const meal = await Meal.findOne({
    where: {
      id,
      status: 'active',
    },
    include: [
      {
        model: Restaurant,
      },
    ],
  });

  res.status(200).json({
    status: 'succes',
    meal,
  });
});

//update one meal
exports.updateMeal = catchAsync((req, res, next) => {
  const { meal } = req;

  const { name, price } = req.body;

  meal.update({ name, price });

  res.status(200).json({
    status: 'success',
    message: 'meal has been updated',
    meal,
  });
});

//delete one meal
exports.deleteMeal = catchAsync((req, res, next) => {
  const { meal } = req;

  meal.update({ status: 'disabled' });

  res.status(200).json({
    status: 'success',
    message: 'meal has been deleted',
  });
});
