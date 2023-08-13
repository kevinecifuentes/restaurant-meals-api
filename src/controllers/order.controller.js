const User = require('./../models/user.model')
const { Order } = require('./../models/order.model')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

//create order
exports.createOrder = catchAsync(async (req, res, next) => {
  const { quantity, mealId, userId, totalPrice } = req.body

  const order = await Order.create({
    quantity,
    mealId,
    userId,
    totalPrice,
  })

  return res.status(200).json({
    status: 'success',
    message: 'Order has been successfully',
    order,
  })
})

exports.findMyOrders = catchAsync(async (req, res, next) => {})

//delete order
exports.deleteOrder = catchAsync(async (req, res, next) => {
  const { order } = req

  await order.update({ status: 'cancelled' })

  return res.status(200).json({
    status: 'success',
    message: 'user has been deleted',
  })
})
