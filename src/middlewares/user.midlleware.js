const User = require('../models/user.model')
const AppError = require('../utils/appError')

exports.validUser = async (req, res, next) => {
  try {
    const { id } = req.params

    const user = await User.findOne({
      where: { id },
      status: 'active',
    })
    if (!user) {
      return next(new AppError(`User with id: ${id} not found`, 404))
      /* return res.status(404).json({
        status: 'error',
        message: `User with ${id} not found`,
      }) */
    }
    req.user = user
    next()
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: 'Error validate user',
    })
  }
}
