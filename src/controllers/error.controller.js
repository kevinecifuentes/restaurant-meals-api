const errorsDev = (err, res) => {
  console.log(err)
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  })
}

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'fail'

  if (process.env.NODE_ENV === 'development') {
    errorsDev(err, res)
  }

  /* return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  }) */
}

module.exports = globalErrorHandler
