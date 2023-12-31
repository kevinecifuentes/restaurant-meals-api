const catchAsync = require('../utils/catchAsync');
const { Restaurant } = require('./../models/restaurant.model');
const AppError = require('./../utils/appError');
const Review = require('./../models/review.model');

//create a restaurant
exports.createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  if (rating < 1 || rating > 5) {
    return next(
      new AppError('Rating only accept numbers between 1 and 5', 401)
    );
  }

  const restaurant = await Restaurant.create({ name, address, rating });

  res.status(200).json({
    status: 'success',
    message: `restaurant ${name} has been created`,
    restaurant,
  });
});

//find all restaurants
exports.findAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    where: {
      status: 'active',
    },
    attributes: {
      exclude: ['status', 'createdAt', 'updatedAt'],
    },
    include: [
      {
        model: Review,
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    restaurants,
  });
});

//find a restaurant
exports.findOneRestaurant = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({
    where: {
      id,
      status: 'active',
    },
    attributes: {
      exclude: ['status', 'createdAt', 'updatedAt'],
    },
    include: [
      {
        model: Review,
        attributes: {
          exclude: ['status'],
        },
      },
    ],
  });

  if (!restaurant)
    return next(new AppError(`Restaurant with id: ${id} not found`, 404));

  res.status(200).json({
    status: 'success',
    restaurant,
  });
});

//update a restaurant
exports.updateRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  const { name, address } = req.body;

  await restaurant.update({
    name,
    address,
  });

  res.status(200).json({
    status: 'success',
    message: `restaurant ${name} has been updated`,
    restaurant,
  });
});

//delete a restaurant
exports.deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  await restaurant.update({
    status: 'disabled',
  });

  res.status(200).json({
    status: 'success',
    message: `Restaurant ${restaurant.name} has been deleted`,
  });
});

//===========================================reviews=============================================//

// create review for a restaurant
exports.createReviewToRestaurant = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { id: restaurantId } = req.params;
  const { id: userId } = req.sessionUser;

  if (rating < 1 || rating > 5)
    return next(
      new AppError('Rating only accept numbers between 1 and 5', 401)
    );

  const review = await Review.create({
    comment,
    rating,
    restaurantId,
    userId,
  });

  res.status(200).json({
    status: 'success',
    message: `review has been created`,
    review,
  });
});

//update a review for a restuarant
exports.updateReview = catchAsync(async (req, res, next) => {
  const { restaurantId } = req.params;
  const { sessionUser } = req;
  const { review } = req;
  const { comment, rating } = req.body;

  const restaurant = await Restaurant.findOne({
    where: {
      id: restaurantId,
      status: 'active',
    },
  });

  if (review.userId !== sessionUser.id) {
    return next(
      new AppError("You don't have permission for edit this review"),
      404
    );
  }

  if (!restaurant) return next(new AppError('Restaurant not found', 404));

  if (rating < 1 || rating > 5)
    return next(
      new AppError('Rating only accept numbers between 1 and 5', 401)
    );

  await review.update({ comment, rating });

  res.status(200).json({
    sttaus: 'succes',
    message: 'review has been updated',
    review,
  });
});

//delete a review reataurant
exports.deleteReview = catchAsync(async (req, res, next) => {
  const { restaurantId } = req.params;
  const { sessionUser } = req;
  const { review } = req;

  const restaurant = await Restaurant.findOne({
    where: {
      id: restaurantId,
      status: 'active',
    },
  });

  if (review.userId !== sessionUser.id) {
    return next(
      new AppError("You don't have permission for delete this review"),
      404
    );
  }

  if (!restaurant) return next(new AppError('Restaurant not found', 404));

  await review.update({ status: 'disabled' });

  res.status(200).json({
    sttaus: 'succes',
    message: 'review has been deleted',
  });
});
