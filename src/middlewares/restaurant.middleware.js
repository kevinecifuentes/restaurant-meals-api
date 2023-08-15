const Review = require('../models/review.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { Restaurant } = require('./../models/restaurant.model');

exports.validRestaurant = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  if (!restaurant) next(new AppError('restaurant not found', 404));

  req.restaurant = restaurant;
  next();
});
