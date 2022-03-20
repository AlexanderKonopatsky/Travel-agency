const express = require('express')
const Tour = require('../models/tourModel')
const Category = require('../models/categoryModel')
const Order = require('../models/orderModel')
const City = require('../models/cityModel')
const Country = require('../models/countryModel')
const tourRouter = express.Router()
const { isAuth, isAdmin } = require('../middleware/utils')
const ObjectId = require('mongodb').ObjectID;


tourRouter.get('/cityInTheCountry', async (req, res) => {
   const country = req.query.country
   let countryId = await Country.findOne({countryName : country}).select('_id')
   console.log('countryId', countryId._id)
   const ddd = await City.find({country : countryId._id}).select('cityName')
   console.log('ddd', ddd)
   let countryList = []
    ddd.forEach(item => {
      console.log('item', item)
      countryList.push(item.cityName)
   })
   console.log(countryList)
   res.send(countryList)
  
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

tourRouter.get('/:id', async (req, res) => {
  const tour = await Tour.findById(req.params.id).populate('comments.user').populate('categoryS')
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
    tour.imageGallery = req.body.uploadedImage.length !== 0 ? req.body.uploadedImage : tour.imageGallery,
    tour.categoryS = categoryFrom._id
    const updatedTour = await tour.save()
    res.send({ message: 'Tour updated', tour: updatedTour})
  } else {
    res.status(404).send({ message: 'Tour not found' })
  }
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
        rating: Number(req.body.rating)
      }
      tour.comments.push(comment)
      tour.numReviews = tour.comments.length
      tour.rating = (tour.comments.reduce((a, c) =>  c.rating + a, 0 ) / tour.comments.length).toFixed(2)
      const updatedTour = await tour.save()
      res.status(201).send({ message: 'Comment created', comment: updatedTour.comments[updatedTour.comments.length - 1]})
    } else {
      res.status(404).send({ message: 'You cannot write comments, because you have not ordered this tour' })
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





