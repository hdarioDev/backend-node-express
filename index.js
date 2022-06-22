const express = require('express')
const cors = require('cors')
const routerApi = require('./routes')
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler.js')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
process.setMaxListeners(0)
app.get('/', (req, res) => {
  res.send('Hello server express')
})

routerApi(app)
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)


app.listen(port, () => {
  console.log("running in " + port);
})
