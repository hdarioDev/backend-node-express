const { ValidationError } = require('sequelize')

function logErrors(err, req, res, next) {// para detectar midleware debe tener los 4 parametros
  console.log("logErrors")
  next(err)
}

function errorHandler(err, req, res, next) {
  console.log("errorHandler")
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
  //si hay error este es el punto final no hay next
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err
    res.status(output.statusCode).json(output.payload)
  }
  next(err)
}

function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    })
  }
  next(err)
}

module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler }
