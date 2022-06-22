const express = require('express')
const ProductsService = require('./../services/product.service');
const validatorHandler = require('../middlewares/validator.handler')
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/product.schema')

const router = express.Router()
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products)
});

router.get('/filter', (req, res) => {
  res.send('I am filter')
})

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {

      const { id } = req.params
      const product = await service.findOne(id)
      res.json(product)
    } catch (error) {
      next(error)//ejecutar middlewares tipo error
    }

    // if (id === '999') {
    //   res.status(404).json({
    //     message: 'not found'
    //   })
    // } else {
    //   res.json({
    //     id,
    //     name: "test",
    //     price: 100
    //   })
    // }

  })

router.post('/',
  validatorHandler(createProductSchema, 'body'),//middleware
  async (req, res) => {
    const body = req.body
    const newProduct = await service.create(body)
    res.status(201).json(newProduct)

  })

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),//middleware
  validatorHandler(updateProductSchema, 'body'),//middleware
  async (req, res, next) => {
    try {

      const { id } = req.params
      const body = req.body
      const product = await service.update(id, body)
      res.json(product)
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
      next(error)
    }
  })

// router.put('/:id', (req, res) => {
//   const { id } = req.params
//   const body = req.body
//   res.json({
//     message: 'updated',
//     data: body,
//     id
//   })
// })


router.delete('/:id', (req, res) => {
  const { id } = req.params
  const rta = service.delete(id)
  res.json(rta)
})

module.exports = router
