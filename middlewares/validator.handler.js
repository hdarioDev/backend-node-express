const boom = require('@hapi/boom')

function validatorHandler(schema, property) {
  return (req, res, next) => {// crear midleware dinamicamente
    const data = req[property]
    const { error } = schema.validate(data, { abortEarly: false }) // false para retornar todos los errores
    if (error) {
      next(boom.badRequest(error))

    }
    next()
  }
}

module.exports = validatorHandler
