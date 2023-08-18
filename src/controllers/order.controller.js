const User = require('./../models/user.model');
const { Order } = require('./../models/order.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { Restaurant } = require('../models/restaurant.model');
const { Meal } = require('../models/meal.model');

//create order
exports.createOrder = catchAsync(async (req, res, next) => {
  const { quantity, mealId } = req.body;
  const { id: userId } = req.sessionUser;

  const meal = await Meal.findOne({
    where: {
      id: mealId,
    },
  });

  if (!meal) next(new AppError('Meal not found', 404));

  const totalPrice = quantity * meal.price;

  const order = await Order.create({
    quantity,
    mealId,
    totalPrice,
    userId,
  });

  return res.status(200).json({
    status: 'success',
    message: 'Order has been successfully',
    order,
  });
});

//find my orders
exports.findMyOrders = catchAsync(async (req, res, next) => {
  const { id: userId } = req.sessionUser;

  const orders = await Order.findAll({
    where: {
      userId,
      status: ['active', 'completed'],
    },
    include: [
      {
        model: Meal,
        include: [
          {
            model: Restaurant,
          },
        ],
      },
    ],
  });

  return res.status(200).json({
    status: 'success',
    orders,
  });
});

//complete order
exports.completeOrder = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { order } = req;

  if (order.userId !== sessionUser.id) return next(
    new AppError("You don't have permission for edit this order"),
    404
  );

  await order.update({ status: 'completed' });

  return res.status(200).json({
    status: 'success',
    message: 'Order has been completed',
    order,
  });
});

//delete
exports.deleteOrder = catchAsync(async (req, res, next) => {
  // const { id: userId } = req.sessionUser;
  const { order } = req;

  await order.update({ status: 'cancelled' });

  return res.status(200).json({
    status: 'success',
    message: 'Order has been deleted',
  });
});
