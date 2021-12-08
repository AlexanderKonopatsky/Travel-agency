const express = require('express')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const { generateJsonToken } = require('../utils')
const { isAuth, isAdmin } = require('../utils')

const userRouter = express.Router()

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
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
  const createdUser = await user.save()
  res.send({
    _id: createdUser._id,
    firstName: createdUser.firstName,
    lastName: createdUser.lastName,
    email: createdUser.email,
    isAdmin: createdUser.isAdmin,
    token: generateJsonToken(createdUser)
  })
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