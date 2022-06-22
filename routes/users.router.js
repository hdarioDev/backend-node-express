const express = require('express')
const { faker } = require('@faker-js/faker')

const router = express.Router()

//PARAMS QUERY
router.get('/users', (req, res) => {
  const { offset, limit } = req.query;
  const result = [];
  if (offset && limit) {
    /* Los parámetros requperados de query,
    vienen como string, es necesario pasarlos a int*/
    for (let i = parseInt(offset); i < parseInt(limit); i++) {
      result.push(initialDB.users[i]);
    }
    res.json(result);
  } else {
    res.send('No data found');
  }
});

module.exports = router
