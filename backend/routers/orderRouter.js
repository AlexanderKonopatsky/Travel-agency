const express = require('express')
const Order = require('../models/orderModel')
const Tour = require('../models/tourModel')
const User = require('../models/userModel')
const { isAuth } = require('../utils')

const orderRouter = express.Router()

orderRouter.post('/', isAuth, async (req, res) => {
  if (req.body.orderItems.length === 0) {
    res.status(400).send({ message: 'Cart is empty' })
  } else {
    const order = new Order({
      orderItems: req.body.orderItems,
      userInfo: req.user._id
    })
    const createdOrder = await order.save()
    res.status(201).send({ message: 'Order created', order: createdOrder })
  }
})

orderRouter.get('/:id', isAuth, async (req, res) => {
  const order = await Order.findById(req.params.id).populate('orderItems userInfo')
  if (order) {
    res.send(order)
  } else {
    res.status(404).send({ message: 'Order not found'})
  }
})

module.exports = orderRouter