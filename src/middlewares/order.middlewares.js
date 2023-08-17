const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { Order } = require('./../models/order.model');

exports.validOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({
    where: {
      id,
    },
  });

  if (!order) return next(new AppError('This order does not exists', 404));

  if (order.status === 'completed') {
    return next(new AppError('Order already completed', 400));
  }

  if (order.status === 'cancelled') {
    return next(new AppError('You cannot do that with complete orders', 400));
  }

  req.order = order;
  next();
});

// exports.validCompleteOrder = catchAsync(async (req, res, next) => {
//   const { id } = req.params;

//   const order = await Order.findOne({
//     where: {
//       id,
//     },
//   });

//   if (!order) return next(new AppError('This order does not exists', 404));

//   if (order.status === 'completed') {
//     return next(new AppError('Order already completed', 400));
//   }

//   if (order.status === 'cancelled') {
//     return next(new AppError('You cannot update cancelled orders', 400));
//   }

//   req.order = order;
//   next();
// });
