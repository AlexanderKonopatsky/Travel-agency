const express = require('express')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const { isAuth, isAdmin, generateJsonToken } = require('../middleware/utils')
const mailer = require('../emails/nodemailer')
const {v4: uuidv4 } = require('uuid')
var mongoose = require('mongoose');

const userRouter = express.Router()

const sendVerificationEmail = async ( _id, email) => {
   const currentUrl = 'http://localhost:5000/'
   const uniqueString = uuidv4() + _id

   const message = {
      to: email,
      subject: 'Подтвердите свою почту',
      html : `<p>Перейдите по следующей ссылке для подтверждения своей почты ${email} </p><br><br><p>Ссылка доступна в течении 6 часов</p><br><br><p>Ссылка: <a href=${currentUrl}api/users/verify/${_id}/${uniqueString}>здесь</a></p>`
   }

   const saltRound = 10
   const hashUniqueString =  await bcrypt.hash(uniqueString, saltRound)
   const newVerification = {
      uniqueString: hashUniqueString,
      createdAt: Date.now(),
      expiresAt: Date.now() + 21600000
   }
   let user = await User.findById(_id)
   if (user) {
      user.verificationInfo = newVerification
      await user.save()
      mailer(message)
   } 
}

userRouter.get('/verify/:userId/:uniqueString', async (req, res) => {
   let { userId, uniqueString } = req.params
   if (mongoose.Types.ObjectId.isValid(userId)) {
      let info  = await User.findById(userId).select('verificationInfo')
      if (info) {
         const expiresData = info.verificationInfo.expiresAt
         const hashedUniqueString = info.verificationInfo.uniqueString
         if (expiresData < Date.now()) {
            res.status(401).send({ message: 'Time is up' })
         } else {
            let result = await bcrypt.compare(uniqueString, hashedUniqueString)
            if (result) {
               await User.updateOne({ _id: userId}, {verified: true})
               res.status(200).send({ message: 'Everything is fine. Account verified' })
            } else {
               res.status(401).send({ message: `Unique string not valid` })
            }
         }
      } else {
         res.status(401).send({ message: 'User not found' })
      }
   } else {
      res.status(401).send({ message: 'UserId not valid' })
   }
})

userRouter.get('/seed', async (req, res) => {
/*   await User.remove({}) */
  const createdUsers = await User.insertMany(data.users)
  res.send({createdUsers})
})



userRouter.post('/signin', async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateJsonToken(user)
      })
      return
    } else {
      res.status(401).send({ message: 'Invalid password' })
    }
  } else {
    res.status(401).send({ message: 'Invalid email or password' })
  }
})

userRouter.post('/signUp', async (req, res) => {
  const user = await User.findOne({ email: req.body.email})
  if (!user) {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      verified: false
    })
    const createdUser = await user.save()
    res.send({
      _id: createdUser._id,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateJsonToken(createdUser),
      verified: false,
    })
    sendVerificationEmail(createdUser._id, req.body.email)
  } else {
    res.status(401).send({ message : 'There is already a user with this mail' })
  }
})

userRouter.get('/checkVerification/:userId', async (req, res) => {
   const data = await User.findById(req.params.userId).select('verified')
   console.log(data)
   res.send({ message: data})
})


userRouter.get('/:id', isAuth, async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    res.send(user)
  } else {
    res.status(404).send({ message: 'User not found'})
  }
})


userRouter.put('/profile', isAuth, async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    user.firstName = req.body.firstName
    user.lastName = req.body.lastName
    user.email = req.body.email
    user.imageProfile = req.body.image ? req.body.image :  user.imageProfile
    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password, 8)
    }
    const updatedUser = await user.save()
    res.send({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      imageProfile: updatedUser.imageProfile, 
      token: generateJsonToken(updatedUser)
    })
  }
})

userRouter.put('/profile2', isAuth, isAdmin, async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    user.firstName = req.body.firstName
    user.lastName = req.body.lastName
    user.email = req.body.email
/*     user.imageProfile = req.body.image */
    const updatedUser = await user.save()
    res.send({ message: "User updated", user: updatedUser })
  }
})

userRouter.get('/', isAuth, isAdmin, async (req, res) => {
  const users = await User.find({})
  res.send(users)
})

userRouter.put('/:id', isAuth, isAdmin,  async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    user.firstName = req.body.firstName || user.firstname;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;
    user.isActive = req.body.isActive || user.isActive;

    const updatedUser = await user.save()
    res.send({ message: "User updated", user: updatedUser })
  } else {
    res.status(404).send({ message: "User not found" })
  }
})
module.exports = userRouter