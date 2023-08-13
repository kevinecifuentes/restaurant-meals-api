const AppError = require('../utils/appError')
const User = require('./../models/user.model')
const { Order } = require('./../models/order.model')
const catchAsync = require('./../utils/catchAsync')

//find details about one order
exports.findOneUserOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params

  const order = await Order.findOne({
    where: {
      id,
      status: 'active',
    },
    include: [
      {
        model: User,
      },
    ],
  })

  if (!order) next(new AppError(`order with id: ${id} not found`, 404))

  return res.status(200).json({
    status: 'success',
    order,
  })
})

//get all orders made by users
exports.findAllUserOrder = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: {
      status: 'active',
    },
    attributes: ['id', 'name', 'email', 'role'],
    include: [
      {
        model: Order,
        where: {
          status: ['cancelled', 'active', 'completed'],
        },
        attributes: {
          exclude: ['userId'],
        },
      },
    ],
  })

  if (users.length === 0) {
    return next(
      new AppError('There are not orders creted for this user yet', 404)
    )
  }

  return res.status(200).json({
    status: 'success',
    result: users.length,
    users,
  })
})

//create user
exports.createUser = catchAsync(async (req, res) => {
  const { name, email, password } = req.body

  const user = await User.create({
    name: name.toLowerCase().trim(),
    email: email.toLowerCase().trim(),
    password,
  })

  return res.status(200).json({
    status: 'success',
    message: 'user has been created',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    },
  })
})

//update user profile
exports.updateUser = catchAsync(async (req, res, next) => {
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
})

//delete user
exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req

  await user.update({ status: 'disabled' })

  return res.status(200).json({
    status: 'success',
    message: 'user has been deleted',
  })
})
