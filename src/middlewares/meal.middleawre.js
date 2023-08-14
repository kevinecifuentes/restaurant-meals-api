const { Meal } = require('../models/meal.model')
const catchAsync = require('../utils/catchAsync')

exports.validMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const meal = await Meal.findOne({
    where: {
      id,
      status: 'active',
    },
  })

  if (!meal) next(new AppError(`Meal with id: ${id}not found`, 400))

  req.meal = meal
  next()
})