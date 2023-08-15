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
exports.findAllRestaurants = catchAsync(async (req, res) => {
  const restaurants = await Restaurant.findAll({
    where: {
      status: 'active',
    },
    attributes: {
      exclude: ['status', 'createdAt', 'updatedAt'],
    },
  });

  res.status(200).json({
    status: 'success',
    restaurants,
  });
});

//find a restaurant
exports.findOneRestaurants = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  res.status(200).json({
    status: 'success',
    restaurant: {
      id: restaurant.id,
      name: restaurant.name,
      address: restaurant.address,
      rating: restaurant.rating,
    },
  });
});

//update a restaurant
exports.updateRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
 
  const { name, address, } = req.body;

  await restaurant.update({
    name,
    address,
  } )

  res.status(200).json({
    status: 'success',
    message: `restaurant ${name} has been updated`,
    restaurant,
  });
});

//delete a restaurant
exports.deleteRestaurant = catchAsync(async (req, res) => {
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

  const { comment, rating} = req.body;
  const {id: restaurantId} = req.params
  const { id: userId } = req.sessionUser

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
exports.updateReviewToRestaurant = catchAsync(async (req, res, next) => {});

//delete a review reataurant
exports.deleteReviewToRestaurant = catchAsync(async (req, res, next) => { });


