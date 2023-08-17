const AppError = require('../utils/appError');
const User = require('./../models/user.model');
const { Order } = require('./../models/order.model');
const catchAsync = require('./../utils/catchAsync');
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt');
const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');

//get all orders mades by users
exports.findAllUserOrder = catchAsync(async (req, res, next) => {
  const { id } = req.sessionUser;

  const users = await User.findAll({
    where: {
      status: 'active',
      id,
    },
    attributes: ['id', 'name', 'email', 'role'],
    include: [
      {
        model: Order,
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
        where: {
          status: ['cancelled', 'active', 'completed'],
        },
        attributes: {
          exclude: ['userId'],
        },
      },
    ],
  });

  if (users.length === 0) {
    return next(
      new AppError('There are not orders creted for this user yet', 404)
    );
  }

  return res.status(200).json({
    status: 'success',
    result: users.length,
    users,
  });
});

//find details about one order
exports.findOneUserOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.sessionUser;

  const order = await Order.findOne({
    where: {
      id,
      userId,
      status: 'active',
    },
    include: [
      {
        model: User,
      },
    ],
  });

  if (!order)
    next(
      new AppError(
        `order with id: ${id} is not asociated to the session user`,
        404
      )
    );

  return res.status(200).json({
    status: 'success',
    order,
  });
});

//create user
exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name: name.toLowerCase().trim(),
    email: email.toLowerCase().trim(),
    password: encryptedPassword,
    role,
  });

  const token = await generateJWT(user.id);

  return res.status(200).json({
    status: 'success',
    message: 'user has been created',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    },
  });
});

//login
exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email: email.toLowerCase().trim(),
      status: 'active',
    },
  });

  if (!user) {
    return next(new AppError(`User with email: ${email} not found!`, 404));
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'success',
    message: 'The user has been logged in',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    },
  });
});

//update user profile
exports.updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { name, email } = req.body;

  const updateUser = await user.update({
    name: name.toLowerCase().trim(),
    email: email.toLowerCase().trim(),
  });

  return res.status(200).json({
    status: 'success',
    message: 'user updated',
    updateUser,
  });
});

//delete user
exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: 'disabled' });

  return res.status(200).json({
    status: 'success',
    message: 'user has been deleted',
  });
});
