const express = require('express')

//controllers
const userController = require('./../controllers/user.controller')

//Middlewares
const userMiddlware = require('./../middlewares/user.midlleware')

const router = express.Router()

//signup
router.route('/signup').post(userController.createUser)

//signin
// router.route('/signin').post(userController.createUserOrder)

router.route('/orders').get(userController.findAllUserOrder)

router
  .route('/orders/:id')
  .get(userMiddlware.validUser, userController.findOneUserOrder)

router
  .route('/:id')
  .patch(userMiddlware.validUser, userController.updateUserOrder)
  .delete(userMiddlware.validUser, userController.deleteUserOrder)

module.exports = router
