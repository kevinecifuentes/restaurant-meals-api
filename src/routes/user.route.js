const express = require("express");

//controllers
const userController = require("./../controllers/user.controller");

//Middlewares
const userMiddlware = require("./../middlewares/user.midlleware");
const validationsMiddleware = require("./../middlewares/validantions.middlewares");
const protectMiddleware = require("../middlewares/protect.middleware");

const router = express.Router();

//signup
router
  .route("/signup")
  .post(validationsMiddleware.validationCreateUser, userController.createUser);

//signin
router
  .route("/login")
  .post(validationsMiddleware.validationLoginUser, userController.loginUser);

router.use(protectMiddleware.protect);

router.route("/orders").get(userController.findAllUserOrder);

router.route("/orders/:id").get(userController.findOneUserOrder);

router
  .route("/:id")
  .patch(
    validationsMiddleware.validationUpdateUser,
    userMiddlware.validUser,
    protectMiddleware.protectAcount,
    userController.updateUser
  )
  .delete(
    userMiddlware.validUser,
    protectMiddleware.protectAcount,
    userController.deleteUser
  );

module.exports = router;
