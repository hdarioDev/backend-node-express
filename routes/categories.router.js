const express = require('express')

const router = express.Router()
//PARAMS

router.get('/categories/:categoryId', (req, res) => {
  const { categoryId } = req.params
  res.json([
    {
      categoryId,
      category: 'Food',
      products: []
    }
  ])
})


router.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params
  res.json([
    {
      categoryId,
      productId,
      category: 'Food',
      products: []
    },
    {
      categoryId,
      productId,
      category: 'Games',
      products: []
    }
  ])
})

module.exports = router
