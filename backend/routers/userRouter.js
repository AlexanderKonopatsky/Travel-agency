const express = require('express')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const generateJsonToken = require('../utils')

const userRouter = express.Router()

userRouter.get('/seed', async (req, res) => {
  const createdUsers = await User.insertMany(data.users)
  res.send({createdUsers})
})

userRouter.post('/signin', async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        name: user.name,
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


module.exports = userRouter