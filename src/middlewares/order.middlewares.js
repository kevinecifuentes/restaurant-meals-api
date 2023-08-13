const catchAsync = require('../utils/catchAsync')
const Order = require('./../models/order.model')

exports.validOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params

  const order = await Order.findOne({
    where: {
      id,
    },
  })

  if (!order) next(new AppError('This user does not has orders yet', 404))

  req.order = order
  next()
})
