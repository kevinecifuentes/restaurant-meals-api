const AppError = require('../utils/appError')
const User = require('./../models/user.model')
const { Order } = require('./../models/order.model')
const catchAsync = require('./../utils/catchAsync')

exports.findOneUserOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params
})

//get all orders
exports.findAllUserOrder = catchAsync(async (req, res, next) => {
  const orders = await Order.findAll({
    where: {
      status: 'active',
    },
    include: [
      {
        model: User,
      },
    ],
  })

  if (orders.length === 0) {
    return next(new AppError('In the moment, there are not users creted', 404))
  }

  return res.status(200).json({
    status: 'success',
    result: orders.length,
    orders,
  })
})

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const user = await User.create({
      name: name.toLowerCase().trim(),
      email: email.toLowerCase().trim(),
      password,
    })

    return res.status(200).json({
      status: 'success',
      message: 'user has been created',
      user,
    })
  } catch (err) {
    console.log(err)

    res.status(500).json({
      status: 'fail',
      message: 'something went wrong',
      err,
    })
  }
}

exports.updateUserOrder = catchAsync(async (req, res, next) => {
  /*  try { */
  const { user } = req
  const { name, email } = req.body

  await user.update({
    name: name.toLowerCase().trim(),
    email: email.toLowerCase().trim(),
  })

  return res.status(200).json({
    status: 'success',
    message: 'user updated',
    user,
  })
  /*  } catch (err) {
    console.log(err)
    res.status(500).json({
      status: 'fail',
      message: 'something went wrong',
    })
  } */
})

exports.deleteUserOrder = catchAsync(async (req, res, next) => {
  const { user } = req

  await user.update({ status: 'disabled' })

  return res.status(200).json({
    status: 'succes',
    message: 'user has been deleted',
  })
})
