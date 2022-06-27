const express = require('express')
const mongoose = require('mongoose')
require("dotenv").config();
const userRouter = require('./routers/userRouter')
const tourRouter = require('./routers/tourRouter')
const orderRouter = require('./routers/orderRouter')
const uploadRouter = require('./routers/uploadRouter')
const commentRouter = require('./routers/commentRouter')
const categoryRouter = require('./routers/categoryRouter')
const countryRouter = require('./routers/countryRouter')
const cityRouter = require('./routers/cityRouter')
const attractionRouter = require('./routers/attractionRouter')
const dashboardRouter = require('./routers/dashboardRouter')
const path = require('path')
const http = require('http')
const Server  = require('socket.io')
const mailer = require('./emails/nodemailer')

const User = require('./models/userModel')
const Chat = require('./models/chatModel')


const port = process.env.PORT || 5000

const MONGODB_URL1 = `mongodb+srv://alexander:alexander321@cluster0.wizkj.mongodb.net/TourAgency?retryWrites=true&w=majority`
const MONGODB_URL2 = 'mongodb://localhost/TourAgency'


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const httpServer = http.Server(app)
const io = Server(httpServer, { cors: { origin: '*' } })
/* const users = []  */

io.on('connection', (socket) => {

   socket.on('disconnect', async () => {
      console.log('disconnect')
      const user = await Chat.findOne({ socketId : socket.id})
      if (user) {
         user.online = false
         await user.save()
         const admin = await Chat.findOne({ isAdmin : true, online : true})
         if (admin) {
            io.to(admin.socketId).emit('updateUser', user) 
         } 
      }
   })

   socket.on('onLogin', async user => { 
      const updatedUser = {
         ...user, 
         online: true,
         socketId: socket.id,
         messages: []
      }
      const existUser = await Chat.findOne({ _id : updatedUser._id})
      if (existUser) {
         existUser.socketId = socket.id
         existUser.online = true
         await existUser.save()
      } else {
         await Chat.create(updatedUser)
      }
      const admin = await Chat.findOne({ isAdmin : true, online : true})
      if (admin) {
         io.to(admin.socketId).emit('updateUser', updatedUser)
      }
   })

   socket.on('onUserSelected', async user => {

      const admin = await Chat.findOne({ isAdmin : true, online : true})

      if (admin) {
         const existUser = await Chat.findOne({_id : user._id})
         io.to(admin.socketId).emit('selectUser', existUser) 
      }


   })
 
   socket.on('onMessage', async message => { 

      if (message.isAdmin) { 
         const user = await Chat.findOne({ _id : message._id, online : true }) 
         if (user) {
            io.to(user.socketId).emit('message', message)
            user.messages.push(message)
            await user.save()
         }
      } else {
         const admin = await Chat.findOne({ isAdmin : true, online: true} )
         if (admin) {
            io.to(admin.socketId).emit('message', message) 
            const user = await Chat.findOne({ _id : message._id, online : true}) 
            user.messages.push(message) 
            await user.save() 
         }  else {
            io.to(socket.id).emit('message', { 
               name: 'Admin',
               body: 'Sorry. I am not online right now'
            }
            )
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
app.use('/api/dashboard', dashboardRouter)
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.get('/', (req, res) => {
  res.send('server is ready')
})


app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message })
})



httpServer.listen(port, () => {
   const message = {
      
      to: 'alexander.prk7@gmail.com',
      subject: 'Test',
      text: 'Congatulations'
   }
/*    mailer(message) */
   console.log(`http://localhost:${port}/`)
 })