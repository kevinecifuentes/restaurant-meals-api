const express = require('express')
const AppError = require('./utils/appError')
const morgan = require('morgan')

//routes
const userRoutes = require('./routes/user.route')
const orderRoutes = require('./routes/order.route')
const restaurantRoutes = require('./routes/restaurant.route')
const mealRoutes = require('./routes/meal.route')

const app = express()

app.use(express.json())
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// global error
const globalErrorHandler = require('./controllers/error.controller')

//user routes
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/orders', orderRoutes)
app.use('/api/v1/restaurants', restaurantRoutes)
app.use('/api/v1/meals', mealRoutes)

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  )
})

app.use(globalErrorHandler)

module.exports = app
