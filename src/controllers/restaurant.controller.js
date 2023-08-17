const { Meal } = require('../models/meal.model');
const catchAsync = require('../utils/catchAsync');
const { Restaurant } = require('./../models/restaurant.model');
const AppError = require('./../utils/appError');
const Review = require('./../models/review.model');

//create a restaurant
exports.createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const restaurant = await Restaurant.create({ name, address, rating });

  if (rating < 1 || rating > 5)
    next(new AppError('Rating only accept numbers between 1 and 5', 401));

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
exports.findOneRestaurants = catchAsync(async (req, res, next) => {
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
    message: `restaurant ${restaurant.name} has been deleted`,
  });
});

//===========================================reviews=============================================//

// create review for a restaurant
exports.createReviewToRestaurant = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { id: restaurantId } = req.params;
  const { id: userId } = req.sessionUser;

  const review = await Review.create({
    comment,
    rating,
    restaurantId,
    userId,
  });

  if (rating < 1 || rating > 5)
    next(new AppError('Rating only accept numbers between 1 and 5', 401));

  res.status(200).json({
    status: 'success',
    message: `review has been created`,
    review,
  });
});

//TODO Arreglar bug de que solo me deje actualizar o eliminar la orden si el restaurante está asociado a la review o viceversa, independientemente de si existe o no el restaurant.
//update a review for a restuarant
exports.updateReview = catchAsync(async (req, res, next) => {
  const { restaurantId } = req.params;
  const { review } = req;
  const { comment, rating } = req.body;

  const restaurant = await Restaurant.findOne({
    where: {
      id: restaurantId,
      status: 'active',
    },
  });

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
  const { review } = req;

  const restaurant = await Restaurant.findOne({
    where: {
      id: restaurantId,
    },
  });

  if (!restaurant) return next(new AppError('Restaurant not found', 404));

  await review.update({ status: 'disabled' });

  res.status(200).json({
    sttaus: 'succes',
    message: 'review has been deleted',
  });
});
