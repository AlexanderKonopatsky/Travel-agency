const express = require('express')
const Order = require('../models/orderModel')
const Tour = require('../models/tourModel')
const User = require('../models/userModel')
const { isAuth, isAdmin } = require('../middleware/utils')
var mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const Category = require('../models/categoryModel')
const mailer = require('../emails/nodemailer')

const orderRouter = express.Router()



orderRouter.post('/', isAuth, async (req, res) => {



  if (req.body.orderItems.length === 0) {
    res.status(400).send({ message: 'Cart is empty' })
  } else {
    let totalPrice = 0
    req.body.orderItems.forEach(el => {
      totalPrice += el.totalPrice
    })


    const order = new Order({
      orderItems: req.body.orderItems,
      ordersInfo: req.body.orderItems,
      userInfo: req.user._id,
      totalPrice, 
    
    })

    req.body.orderItems.forEach(async (el, index) => {

      const tour = await Tour.findById(req.body.orderItems[index]._id)

      if (tour) {
        let reservedSeats = 0
        tour.availableSeats.forEach(el => {
           if ((el._id + '') == ObjectId(req.body.orderItems[index].idSeats)) {
              reservedSeats = el.reservedSeats
           }
        })
  
  

         let newReserved = reservedSeats + Number(req.body.orderItems[index].numberOfPerson)

         await Tour.updateOne(
           { _id: req.body.orderItems[index]._id, "availableSeats._id": req.body.orderItems[index].idSeats},
           { $set: { 
              "availableSeats.$.reservedSeats" :  newReserved,
           } 
        })
      }
      
    })

    const createdOrder = await order.save()

    const message = {
      to: req.user.email,
      subject: 'Ваш заказ подтверждён',
      html : `<p>Номер заказа ${createdOrder._id}</p>`
   }
   mailer(message)
  
    res.status(201).send({ message: 'Order created', order: createdOrder })
  }
})

orderRouter.delete('/:id/:email', async (req, res) => {
  const order = await Order.findById(req.params.id).populate('ordersInfo._id userInfo')
   console.log(req.params)
  if (order) {
      const deletedOrder = await order.remove()

      order.ordersInfo.forEach(async (el, index) => {

      const tour = await Tour.findById(el._id)
      if (tour) {
      let reservedSeats = 0
      tour.availableSeats.forEach(el2 => {

         if ((el2._id + '') == el.idSeats) {
            reservedSeats = el2.reservedSeats
         }
      })

         let newReserved = reservedSeats - el.numberOfPerson

         await Tour.updateOne(
         { _id: tour._id, "availableSeats._id": el.idSeats},
         { $set: { 
            "availableSeats.$.reservedSeats" :  newReserved,
         } 
      })
      }


   })
   let email = req.params.email
   const message = {
      to: email,
      subject: 'Ваш заказ отменён',
      html : `<p>Номер заказа ${req.params.id}</p>`
   }
   console.log(message)
   mailer(message)
   res.status(200).send({ message: 'Order deleted', order: deletedOrder })
  } else {
   res.status(404).send({ message: 'Order not found'})
  }

})



orderRouter.get('/:id', async (req, res) => {
  const order = await Order.findById(req.params.id).populate('ordersInfo._id userInfo')
  if (order) {
    res.send(order)
  } else {
    res.status(404).send({ message: 'Order not found'})
  }
})


orderRouter.get('/history/list', isAuth, async (req, res) => {
  const orders = await Order.find({ userInfo : req.user._id }).populate('orderItems')
  res.send(orders)
})

orderRouter.get('/', isAuth, isAdmin, async (req, res) => {
  const orders = await Order.find({}).populate('orderItems userInfo')
  res.send(orders)
})

orderRouter.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    const deletedOrder = await order.remove()
    res.send({ message: "Order deleted", order: deletedOrder })
  } else {
     res.status(404).send({ message : "Order not found"})
  }
})



module.exports = orderRouter