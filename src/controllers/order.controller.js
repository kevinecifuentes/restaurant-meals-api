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
  const { id: userId } = req.sessionUser;
  const { id: orderId } = req.params;

  const order = await Order.findOne({
    where: {
      id: orderId,
      userId,
    },
  });

  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  if (order.status === 'completed') {
    return next(new AppError('This order already completed', 400));
  }

  if (order.status === 'cancelled') {
    return next(new AppError('Cancelled order cannot be completed', 400));
  }

  const meal = await Meal.findOne({
    where: {
      id: order.mealId,
    },
  });

  if (!meal) {
    return next(new AppError('Meal not found', 404));
  }

  if (meal.status === 'disabled') {
    return next(new AppError('Meal is disabled', 400));
  }

  await order.update({ status: 'completed' });

  return res.status(200).json({
    status: 'success',
    message: 'Order has been completed',
    order,
  });
});

/* //para eliminar validaremos que el status de la orden sea active de lo contrario enviaremos un error 
exports.deleteOrder = catchAsync(async (req, res, next) => {
  const { id: userId } = req.sessionUser;
  const { id: orderId } = req.params;

  const order = await Order.update({
    where: {
      id: orderId,
      userId,
    },
  });

  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  if (order.status === 'completed') {
    return next(new AppError('Order already completed', 400));
  }

  await order.update({ status: 'cancelled' });

  return res.status(200).json({
    status: 'success',
    message: 'Order has been deleted',
  });
});
 */

///reviews/:restaurantId/:id

// {restaurantId}

// findone where {
//   restaurantId
// }
