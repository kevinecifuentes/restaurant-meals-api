const express = require('express');

//controllers
const orderControllers = require('./../controllers/order.controller');

//middleware
const orderMiddleware = require('./../middlewares/order.middlewares');
const protectMiddleware = require('./../middlewares/protect.middleware');
const userMiddleware = require('./../middlewares/user.midlleware');

const router = express.Router();

router.use(protectMiddleware.protect);

router.post('/', orderControllers.createOrder);

router.get('/me', orderControllers.findMyOrders);

//TODO Arreglar bug de que solo el usuario que creó la orden, pueda actualizar y eliminar la orden.
router
  .route('/:id')
  .patch(
    orderMiddleware.validOrder,
    userMiddleware.validUser,
    protectMiddleware.protectAcount,
    orderControllers.completeOrder
  )
  .delete(
    orderMiddleware.validOrder,
    userMiddleware.validUser,
    protectMiddleware.protectAcount,
    orderControllers.deleteOrder
  );

module.exports = router;
