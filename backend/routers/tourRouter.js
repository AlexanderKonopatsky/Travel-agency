const express = require('express')
const Tour = require('../models/tourModel')
const Category = require('../models/categoryModel')
const Order = require('../models/orderModel')
const City = require('../models/cityModel')
const Country = require('../models/countryModel')
const User = require('../models/userModel')
const tourRouter = express.Router()
const { isAuth, isAdmin } = require('../middleware/utils')
const ObjectId = require('mongodb').ObjectID;


tourRouter.get('/cityInTheCountry', async (req, res) => {
   const country = req.query.country
   let countryId = await Country.findOne({countryName : country}).select('_id')
   const ddd = await City.find({country : countryId._id}).select('cityName')
   let countryList = []
    ddd.forEach(item => {
      countryList.push(item.cityName)
   })
   res.send(countryList)
  
 })

 tourRouter.post('/advancedSearchPage', async (req, res) => {

   let tours = await Tour
      .find({
         price: {$gt : req.body.sliderValuePriceFrom, $lt: req.body.sliderValuePriceTo},
         rating: {$gt : req.body.ratingValue},
         country: req.body.countryValue 
      })
      .populate({path: 'cityT', match : { cityName : req.body.cityValue}})
      .populate({path: 'categoryS', match : { categoryName : req.body.categoryValue}})
      .select('_id title image category label desc additionalInfo price rating numReviews country categoryS cityT')

   tours = tours.filter(tour => {
      if (tour.cityT && tour.categoryS) return tour   
   })

   res.send({tours})
})

 tourRouter.post('/searchTours', async (req, res) => {
   let ids = []
   const cityName = req.body.cityName 
   const startDate = req.body.startDate
   const endDate = req.body.endDate
   const tour = await Tour.aggregate([
      { $match: {city: cityName }},
      { $unwind: '$availableSeats'},
      { $match: {'availableSeats.startDate': {$gte: new Date(startDate)}}},
      { $match: {'availableSeats.endDate': {$lte: new Date(endDate)}}}
   ])
   tour.forEach(el => {
      ids.push(el._id + "")
   })
   idsUnique = Array.from(new Set(ids))

   const tours2 = await Tour.find({ _id: idsUnique})


   let tours = await Tour
      .find({
         city: req.body.cityName 
      })
    
   res.send({tours: tours2})
})


tourRouter.get('/', async (req, res) => {
  const pageSize = 3
  const currentPage = Number(req.query.page) || 1
  const priceFrom = req.query.priceFrom || 0
  const priceTo = req.query.priceTo || 100000
  const startDate = req.query.startDate
  const endDate = req.query.endDate
  const rating = req.query.rating || -1
  const category = req.query.category
  const country = req.query.country
  const city = req.query.city
  const categoryFilter = category ? { category } : {}
  const countryFilter = country ? { country } : {}
  const cityFilter = city ? { city } : {}
  const ratingFilter = rating ? { city } : {}
  const countTours = await Tour.countDocuments({ ...categoryFilter, ...countryFilter, ...cityFilter  })

  const tours = await Tour.find({
    
    ...categoryFilter,
    ...countryFilter, 
    ...cityFilter,
    rating: {$gt : rating},  
    price: {$gt : priceFrom, $lt: priceTo}

   }).skip(pageSize * (currentPage - 1)).limit(pageSize).populate('categoryS')
  res.send({ tours, pages: Math.ceil(countTours / pageSize) })
})

tourRouter.get('/home', async (req, res) => {
/*   const category2 = await Category.create({ categoryName: 'History', categoryDesc : 'Historical travel includes various kinds of destinations, from Stone Age cave paintings to Cold War installations of the late 20th century.'})
  await category2.save() */
  const category = req.query.category
  const country = req.query.country
  const city = req.query.city
  const categoryFilter = category ? { category } : {}
  const countryFilter = country ? { country } : {}
  const cityFilter = city ? { city } : {}
  const tours = await Tour.find({ ...categoryFilter, ...countryFilter, ...cityFilter}).select('_id title image category label desc additionalInfo price rating numReviews country city').sort({rating: -1})
  res.send({tours})
})

tourRouter.get('/categories', async (req, res) => {
  const categories = await Tour.find().distinct('category')
  res.send(categories)
})

tourRouter.get('/country', async (req, res) => {
  const country = await Tour.find().distinct('country', )
  res.send(country)
})

tourRouter.get('/cityInTheCountry2', async (req, res) => {
  const country = req.query.country
  if (country) {
    const countryList = await Tour.find().distinct('city', { 'country' : country })
    res.send(countryList)
  } else {
    res.send({ message: 'Set the country in the request parameter'})
  }
})




tourRouter.get('/city', async (req, res) => {
  const cities = await Tour.find().distinct('city')
  res.send(cities)
})

tourRouter.get('/getHistory', async (req, res) => {

   const userId = req.query.userId
   const tourHistory = await User.findById(userId).sort({'visitShema.counter' : 1}).populate('visitShema.tourId')

   const tourHistory2 =await User.aggregate([
          { $match: {_id: ObjectId(userId)}},
          { $unwind: "$visitShema" },
          { $sort: { "visitShema.updatedAt": -1 } },
          {
            $lookup:
            {
               from: "tours",
               localField: "visitShema.tourId",
               foreignField: "_id",
               as: "visitShema.tourId"
            }
         }
       ]);
   res.send(tourHistory2)
})

tourRouter.get('/getRecomendation', async (req, res) => {
   const recomedation = await User.aggregate([
      { $match: {_id: ObjectId(req.query.userId)}},
      { $unwind: "$visitShema" },
      { $project: {
         visitShema : 1
      }},
      { $sort: {'visitShema.counter': -1} },
      { $lookup :
         {
           from: "tours",
           localField: "visitShema.tourId",
           foreignField: "_id",
           pipeline : [{ 
            $project: {
               "title": 1,
               "price" : 1, 
               "rating" : 1,
               "category" : 1,
               "country" : 1,
               "city" : 1,
               "rating" : 1
             }
           }],
           as: "visitShema.tourId"
         },
      }, 
   

      {$group: 
         {
           _id: "$visitShema.tourId.city",
           maxcounter: { "$max": "$visitShema.counter"}
         } 
      },  

   ])
   const bestTourInMostVisitCountry = []
   if (recomedation.length >= 1) {
      const bestTourInMostVisitCountry1 = await Tour.find({city : recomedation[0]._id}).sort({rating : -1}).select('_id title image category label desc additionalInfo price rating numReviews country city').limit(1)
      bestTourInMostVisitCountry.push(bestTourInMostVisitCountry1[0])
   }
   if (recomedation.length >= 2) {
      const bestTourInMostVisitCountry2 = await Tour.find({city : recomedation[1]._id}).sort({rating : -1}).select('_id title image category label desc additionalInfo price rating numReviews country city').limit(1)
      bestTourInMostVisitCountry.push(bestTourInMostVisitCountry2[0])
   }
   if (recomedation.length >= 3) {
      const bestTourInMostVisitCountry3 = await Tour.find({city : recomedation[2]._id}).sort({rating : -1}).select('_id title image category label desc additionalInfo price rating numReviews country city').limit(1)
      bestTourInMostVisitCountry.push(bestTourInMostVisitCountry3[0])
   }



   let mostVisitTours = await User.aggregate([
      { $match: {_id: ObjectId(req.query.userId)}},
      { $unwind: "$visitShema" },
      { $project: {
         visitShema : 1
      }},
      { $sort: {'visitShema.counter': -1} },
      { $lookup :
         {
           from: "tours",
           localField: "visitShema.tourId",
           foreignField: "_id",
           pipeline : [{ 
            $project: {
               "title": 1,
               "price" : 1, 
               "rating" : 1,
               "category" : 1,
               "country" : 1,
               "city" : 1,
               "rating" : 1,
               "image" : 1
             }
           }],
           as: "visitShema.tourId"
         },
      }, 
   ])
   res.send({
      mostVisitTours,
      bestTourInMostVisitCountry
   })
})

tourRouter.get('/:id', async (req, res) => {
   let tourId = req.params.id
   let userId =  req.query.userId
   if (req.query.userId) {

      const user = await User.find({ "_id" : userId,  "visitShema.tourId" : tourId})
      if (user.length) {
          await User.updateOne(
               { _id: userId, "visitShema.tourId": tourId },
               {  $inc: { "visitShema.$.counter": 1 } ,
                  $set: { "visitShema.$.updatedAt" : Date.now() } 
               },
            )
      } else {
          const visit = {  tourId, counter : 1, updatedAt: Date.now() }
          const user = await User.findById(userId)
          user.visitShema.push(visit)
          const updatedUser = await user.save()
      }
   
   }
   const tour = await Tour.findById(req.params.id).populate('comments.user').populate('categoryS cityT')
   if (tour) {
      res.send(tour)
   } else {
      res.status(404).send({message: 'Tour not Found'})
   }
})


tourRouter.get('/seed', async (req, res) => {
  const createdTours = await Tour.insertMany(data.tours)
  res.send({createdTours})
})

tourRouter.post('/', isAuth, isAdmin, async (req, res) => {

  const tour = new Tour({
    title: 'title',
    image: '/images/img-2.jpg',
    category: "category",
    label :"label",
    desc:"desc",
    additionalInfo: "additionalInfo",
    price: 0,
    rating: 0,
    numReviews: 0,
    country: 'country'
  })
  const createdTour = await tour.save()
  res.send({ message: 'Tour created', tour: createdTour})
})

tourRouter.put('/:id', isAuth, isAdmin, async (req, res) => {
  const categoryFrom = await Category.findOne({categoryName: req.body.category})
  const city = await City.findOne({cityName: req.body.city})
  const tourId = req.params.id
  const tour = await Tour.findById(tourId)
  if (tour) {
    tour.title = req.body.title;
    tour.image = req.body.image;
    tour.category = req.body.category;
    tour.label = req.body.label;
    tour.desc = req.body.desc;
    tour.additionalInfo = req.body.additionalInfo;
    tour.price = req.body.price;
    tour.country = req.body.country;
    tour.city = req.body.city;
    tour.cityT = city._id;
    tour.imageGallery = req.body.uploadedImage.length !== 0 ? req.body.uploadedImage : tour.imageGallery,
    tour.categoryS = categoryFrom._id
    const updatedTour = await tour.save()
    res.send({ message: 'Tour updated', tour: updatedTour})
  } else {
    res.status(404).send({ message: 'Tour not found' })
  }
})

tourRouter.put('/:id/addAvailableSeats', isAuth, isAdmin, async (req, res) => {
 

   
   const tourId = req.params.id
   const tour = await Tour.findById(tourId)
   if (tour) {
     const checkOrder = await Order.find({  userInfo : req.user._id,  orderItems: tourId } )
     if (checkOrder.length !== 0 || req.user.isAdmin) {
       const availableSeats = {
         startDate: req.body.startDate,
         endDate: req.body.endDate,
         availableSeats: Number(req.body.sliderNumberSeatsAvailable), 
         reservedSeats: 0
       }
       tour.availableSeats.push(availableSeats)
       const updatedTour = await tour.save()
       res.status(201).send({ message: 'Комментарий добавлен'})
     } else {
       res.status(404).send({ message: 'Вы не можете писать комментарий, так как вы не заказывали данный тур.' })
     }
   } else {
     res.status(404).send({ message: 'Tour not found' })
   }

 })


 tourRouter.get('/:tourId/availableSeats', async (req, res) => {
   const availableSeats = await Tour.findById(req.params.tourId).select('availableSeats')

   if (availableSeats) {
      res.send({ availableSeats })


   } else {
      res.status(404).send({ message: 'Available seats not found'})
   }
 })

 tourRouter.delete('/:tourId/:availableSeatsIs', isAuth, isAdmin, async (req, res) => {
   const tourId = req.params.tourId
   const seatsId = req.params.availableSeatsIs
   await Tour.findByIdAndUpdate(tourId, {
      '$pull': {
          'availableSeats':{ '_id': new ObjectId(seatsId) }
      }
   });
   res.send({ message: "Seats deleted" })   
 })



tourRouter.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const tour = await Tour.findById(req.params.id)
  if (tour) {
    const deletedTour = await tour.remove()
    res.send({ message: 'Tour deleted', tour: deletedTour })
  } else {
    res.status(404).send({ message: 'Tour not found'})
  }
})


tourRouter.get('/search/:title', async (req, res) => {
  const title = req.params.title
  const titleFilter = title ? { title: { $regex: title, $options: 'i' } } : {};
  const tours = await Tour.find({...titleFilter})
  res.send(tours)
})


tourRouter.post('/:id/comments', isAuth, async (req, res) => {
  const tourId = req.params.id
  const tour = await Tour.findById(tourId)
  if (tour) {
    const checkOrder = await Order.find({  userInfo : req.user._id,  orderItems: tourId } )
    if (checkOrder.length !== 0 || req.user.isAdmin) {
      const comment = {
        user: req.user._id,
        comment: req.body.comment,
        rating: Number(req.body.rating),
        isActive: false
      }
      tour.comments.push(comment)
      tour.numReviews = tour.comments.length
      tour.rating = (tour.comments.reduce((a, c) =>  c.rating + a, 0 ) / tour.comments.length).toFixed(2)
      const updatedTour = await tour.save()
      res.status(201).send({ message: 'Комментарий добавлен', comment: updatedTour.comments[updatedTour.comments.length - 1]})
    } else {
      res.status(404).send({ message: 'Вы не можете писать комментарий, так как вы не заказывали данный тур.' })
    }
  } else {
    res.status(404).send({ message: 'Tour not found' })
  }
})

tourRouter.get('/:id/comments', async (req, res) => {
  const tourId = req.params.id
  const tour = await Tour.findById(tourId).populate('comments.user')
  if (tour) {
    res.status(201).send(tour.comments)
  } else {
    res.status(404).send({ message: 'Tour not found' })
  }
})


module.exports = tourRouter





