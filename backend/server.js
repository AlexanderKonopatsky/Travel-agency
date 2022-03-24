const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRouter = require('./routers/userRouter')
const tourRouter = require('./routers/tourRouter')
const orderRouter = require('./routers/orderRouter')
const uploadRouter = require('./routers/uploadRouter')
const commentRouter = require('./routers/commentRouter')
const categoryRouter = require('./routers/categoryRouter')
const countryRouter = require('./routers/countryRouter')
const cityRouter = require('./routers/cityRouter')
const attractionRouter = require('./routers/attractionRouter')
const path = require('path')
const http = require('http')
const Server  = require('socket.io')


const port = process.env.PORT || 5000

const MONGODB_URL1 = `mongodb+srv://alexander:alexander321@cluster0.wizkj.mongodb.net/TourAgency?retryWrites=true&w=majority`
const MONGODB_URL2 = 'mongodb://localhost/TourAgency'

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const httpServer = http.Server(app)
const io = Server(httpServer, { cors: { origin: '*' } })
const users = [] 

io.on('connection', (socket) => {

   socket.on('disconnect', () => {
      const user = users.find(x => x.socketId === socket.id) 
      if (user) {
         user.online = false 
         const admin = users.find(x => x.isAdmin && x.online) 
         if (admin) {
            io.to(admin.socketId).emit('updateUser', user) 
         }
      }
   })

   socket.on('onLogin', user => { 
      const updatedUser = {
         ...user, 
         online: true,
         socketId: socket.id,
         messages: []
      }
      const existUser = users.find(x => x._id === updatedUser._id) 
      if (existUser) {                                          
         existUser.socketId = socket.id
         existUser.online = true
      } else {                                                
         users.push(updatedUser)
      }
      const admin = users.find(x => x.isAdmin && x.online) 
      if (admin) {
         io.to(admin.socketId).emit('updateUser', updatedUser)
      }
      if (updatedUser.isAdmin) {
         io.to(updatedUser.socketId).emit('listUsers', users) 
      }
   })

   socket.on('onUserSelected', user => {
      const admin = users.find(x => x.isAdmin && x.online)
      if (admin) {
         const existUser = users.find(x => x._id === user._id) 
         io.to(admin.socketId).emit('selectUser', existUser) 
      }
   })
 
   socket.on('onMessage', message => { 
      if (message.isAdmin) { 
         const user = users.find(x => x._id === message._id && x.online) 
         if (user) {
            io.to(user.socketId).emit('message', message)
            user.messages.push(message)
         }
      } else {
         const admin = users.find(x => x.isAdmin && x.online)
         if (admin) {
            io.to(admin.socketId).emit('message', message) 
            const user = users.find(x => x._id === message._id && x.online) 
            user.messages.push(message) 
         } else {
            io.to(socket.id).emit('message', { 
               name: 'Admin',
               body: 'Sorry. I am not online right now'
            })
         }
      }
   })

})
 



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
app.use('/api/categories', categoryRouter)
app.use('/api/country', countryRouter)
app.use('/api/city', cityRouter)
app.use('/api/attraction', attractionRouter)

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.get('/', (req, res) => {
  res.send('server is ready')
})


app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message })
})

httpServer.listen(port, () => {
   console.log(`http://localhost:${port}/`)
 })