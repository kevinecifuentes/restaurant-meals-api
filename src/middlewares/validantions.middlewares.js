const { body, validationResult } = require('express-validator');

const validFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }
  next();
};

//==================================================validaciones de users=============================================================//

//validaciones al crear un usuario
exports.validationCreateUser = [
  body('name').notEmpty().withMessage('Name is Requerid'),
  body('email')
    .notEmpty()
    .withMessage('Email is requerid')
    .isEmail()
    .withMessage('Email must be a corret format'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be al last 8 characters long')
    .matches(/[a-zA-Z]/)
    .withMessage('Pasword must contain at last one letter'),
  validFields,
];

exports.validationLoginUser = [
  body('email')
    .notEmpty()
    .withMessage('Email is requerid')
    .isEmail()
    .withMessage('Email must be a corret format'),
  body('password').notEmpty().withMessage('Password is requerid'),
  validFields,
];

exports.validationUpdateUser = [
  body('name').notEmpty().withMessage('Name is Requerid'),
  body('email')
    .notEmpty()
    .withMessage('Email is requerid')
    .isEmail()
    .withMessage('Email must be a corret format'),
  validFields,
];

//=============================================validaciones de restaurants===========================================================//

exports.validationCreateRestaurants = [
  body('name').notEmpty().withMessage('Name is Requerid'),
  body('address').notEmpty().withMessage('Addres is Requerid'),
  body('rating').notEmpty().withMessage('Rating is Requerid'),
  validFields,
];

exports.validationUpdateRestaurants = [
  body('name').notEmpty().withMessage('Name is Requerid'),
  body('address').notEmpty().withMessage('Addres is Requerid'),
  validFields,
];

//==================================================validaciones de orden===========================================================//

//validaciones al crear una orden
exports.validationCreateOrder = [
  body('quantity')
    .notEmpty()
    .withMessage('Quantity is requerid')
    .isNumeric()
    .withMessage('This field only accept numbers'),
  body('meals').notEmpty().withMessage('Meals is requerid'),
  validFields,
];

//==================================================validaciones de meals===========================================================//

//validaciones al crear un meals
exports.validationCreateMeals = [
  body('name').notEmpty().withMessage('Name is Requerid'),
  body('price')
    .notEmpty()
    .withMessage('Price is Requerid')
    .isNumeric()
    .withMessage('This field only accept numbers'),
  validFields,
];

exports.validationUpdateMeals = [
  body('name').notEmpty().withMessage('Name is Requerid'),
  body('price').notEmpty().withMessage('Price is Requerid'),
  validFields,
];
