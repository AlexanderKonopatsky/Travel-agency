const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./routers/userRouter')
const tourRouter = require('./routers/tourRouter')

const port = process.env.PORT || 5000
const app = express()

mongoose.connect(process.env.MONGODB_URL || `mongodb+srv://alexander:alexander321@cluster0.wizkj.mongodb.net/TourAgency?retryWrites=true&w=majority`, 
  {
      useNewUrlParser: true,
      useUnifiedTopology: true
  }
)

app.use('/api/users', userRouter)
app.use('/api/tours', tourRouter)

app.get('/', (req, res) => {
  res.send('server is ready')
})


app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message })
})

app.listen(port, () => {
  console.log(`http://localhost:${port}/`)
})




