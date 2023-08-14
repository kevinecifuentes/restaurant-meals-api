const express = require('express')

//controllers
const userController = require('./../controllers/user.controller')

//Middlewares
const userMiddlware = require('./../middlewares/user.midlleware')
const validationsMiddleware = require('./../middlewares/validantions.middlewares')
const protectMiddleware = require('../middlewares/protect.middleware')

const router = express.Router()

//signup
router
  .route('/signup')
  .post(validationsMiddleware.validationCreateUser, userController.createUser)

//signin
router.route('/login').post(userController.loginUser)

router.use(protectMiddleware.protect)

router.route('/orders').get(userController.findAllUserOrder)

router.route('/orders/:id').get(userController.findOneUserOrder)

router
  .route('/:id')
  .patch(userMiddlware.validUser, userController.updateUser)
  .delete(userMiddlware.validUser, userController.deleteUser)

module.exports = router
