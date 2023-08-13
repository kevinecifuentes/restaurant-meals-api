const express = require('express')
const AppError = require('./utils/appError')
const morgan = require('morgan')

//routes
const userRoutes = require('./routes/user.route')
// const authRoute = require('./routes/auth.route')

const app = express()

app.use(express.json())
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// global error
const globalErrorHandler = require('./controllers/error.controller')

//user routes
app.use('/api/v1/users', userRoutes)

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  )
})

app.use(globalErrorHandler)

module.exports = app
