const catchAsync = require('../utils/catchAsync');
const Review = require('./../models/review.model');
const AppError = require('./../utils/appError');

exports.findOneReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await Review.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  if (!review) next(new AppError('Review not found', 404));

  req.review = review;
  next();
});
