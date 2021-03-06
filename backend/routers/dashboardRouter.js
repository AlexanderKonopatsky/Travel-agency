const express = require('express')
const Order = require('../models/orderModel')
const Tour = require('../models/tourModel')
const Country = require('../models/countryModel')
const City = require('../models/cityModel')
const User = require('../models/userModel')
const { isAuth, isAdmin } = require('../middleware/utils')
var mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const Category = require('../models/categoryModel')
const dashboardRouter = express.Router()

dashboardRouter.get('/summary', async (req, res) => {
   const countOrders = await Order.find().count() //+
   const countOrdersTours = await Order.find()
   let arrOrders = [], arrPaidOrders = []
   countOrdersTours.forEach(el => el.orderItems.forEach(el2 => arrOrders.push(el2)))
   countOrdersTours.forEach(el => { if (el.isPaid) arrPaidOrders.push(el) })
   const totalCostByCategory = await Tour.aggregate(
      [
         {$match: {}},
         {
            $group: {
               _id: "$categoryS",
               total: {$sum: "$price"}
            }
         }, 
         {
            $lookup:
            {
              from: "сategories",
              localField: "_id",
              foreignField: "_id",
              as: "categoryName"
            }
         }
      ]
   )
   const tourCount = await Tour.find().count()
   const dailyOrders = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y.%m.%d', date: '$createdAt' } },
          orders: { $sum: 1 },
          sales: { $sum: '$totalPrice' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const averagePriceOnTour = await Tour.aggregate([
       {
         $group: {
            _id:"$country", 
            avg_price: {
               $avg: "$price"
            } 
         } ,
       },
       {
         $sort: {'total_st': -1}
       }
      ])
    let orderInDayAverage  = 0
    dailyOrders.forEach(el => orderInDayAverage += el.orders)
    let date1 = new Date(dailyOrders[dailyOrders.length - 1]._id) 
    let date2 = new Date(dailyOrders[0]._id) 
    let result = ( date1 - date2 ) / 864e5
    let orderInDay = (orderInDayAverage / result).toFixed(2)
    const findPopularCategory = await Order.aggregate([
      { $unwind: "$orderItems" },
      { $group: {
        _id: "$orderItems",
        count: { "$sum": 1 }
      }},
      { "$sort": { "count": -1 } },
      {
         $lookup:
         {
           from: "tours",
           localField: "_id",
           foreignField: "_id",
           as: "tour"
         },
         
      }
    ])
    const countyCount = await Country.find().count()
    const cityCount = await City.find().count()
    let averageRatingTour = await Tour.aggregate(
      [
         {    
            $group: { 
            _id: null,
            avgRating: { $avg: '$rating' }
            }
         }
      ]
    )
   averageRatingTour = (averageRatingTour[0].avgRating).toFixed(2)
   let averagePriceTour = await Tour.aggregate(
      [
         {    
            $group: { 
            _id: null,
            avgPrice: { $avg: '$price' }
            }
         }
      ]
    )
    averagePriceTour = (averagePriceTour[0].avgPrice).toFixed(2)
    const arrayOfToursVisits = await User.aggregate([
      { $project : { "visitShema" : 1 } },
      { $unwind: "$visitShema" },
      {$group: {
         _id: "$visitShema.tourId",
         count: { "$sum": "$visitShema.counter" }
      } },
      {
         $lookup:
         {
           from: "tours",
           localField: "_id",
           foreignField: "_id",
           pipeline : [{ 
               $project: {
                  "title": 1,
                }
            }],
           as: "_id"
         },
      }, 
      { $sort: { count: -1 } },
   ]);

   console.log(arrayOfToursVisits)

   res.send({
      countOrders: countOrders,
      countOrdersTours : arrOrders.length, 
      paidOrders : arrPaidOrders.length,
      totalCostByCategory,
      tourCount,
      orderInDay,
      dailyOrders,
      averagePriceOnTour,
      findPopularCategory,
      countyCount,
      cityCount,
      averageRatingTour, 
      averagePriceTour,
      arrayOfToursVisits

   })
 })


 module.exports = dashboardRouter