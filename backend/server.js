const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRouter = require('./routers/userRouter')
const tourRouter = require('./routers/tourRouter')
const orderRouter = require('./routers/orderRouter')
const uploadRouter = require('./routers/uploadRouter')
const commentRouter = require('./routers/commentRouter')
const path = require('path')

const port = process.env.PORT || 5000

const MONGODB_URL1 = `mongodb+srv://alexander:alexander321@cluster0.wizkj.mongodb.net/TourAgency?retryWrites=true&w=majority`
const MONGODB_URL2 = 'mongodb://localhost/TourAgency'

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



mongoose.connect(process.env.MONGODB_URL || MONGODB_URL1, 
  {
      useNewUrlParser: true,
      useUnifiedTopology: true
  }
)

app.use('/api/users', userRouter)
app.use('/api/tours', tourRouter)
app.use('/api/orders', orderRouter)
app.use('/api/uploads', uploadRouter)
app.use('/api/comments', commentRouter)

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.get('/', (req, res) => {
  res.send('server is ready')
})


app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message })
})

app.listen(port, () => {
  console.log(`http://localhost:${port}/`)
})




