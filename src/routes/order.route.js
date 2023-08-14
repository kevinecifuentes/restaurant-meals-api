const express = require('express')

//controllers
const orderControllers = require('./../controllers/order.controller')

//middleware
const orderMiddleware = require('./../middlewares/order.middlewares')
const protectMiddleware = require('./../middlewares/protect.middleware')

const router = express.Router()

router.use(protectMiddleware.protect)

router.post('/', orderControllers.createOrder)

/* router.get('/me', orderControllers.findMyOrders) */

router
  .route('/:id')
  // .patch(orderMiddleware.validOrder, orderControllers.updateOrder)
  .delete(orderMiddleware.validOrder, orderControllers.deleteOrder)

module.exports = router
