const express = require('express')
const Tour = require('../models/tourModel')
const tourRouter = express.Router()
const { isAuth, isAdmin } = require('../utils')


tourRouter.get('/', async (req, res) => {
  const pageSize = 3
  const currentPage = Number(req.query.page) || 1
  const priceFrom = req.query.priceFrom || 0
  const priceTo = req.query.priceTo || 100000
  const startDate = req.query.startDate
  const endDate = req.query.endDate
  const rating = req.query.rating || 0
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

   }).skip(pageSize * (currentPage - 1)).limit(pageSize)

  console.log(tours)
  res.send({ tours, pages: Math.ceil(countTours / pageSize) })
})

tourRouter.get('/home', async (req, res) => {
  const category = req.query.category
  const country = req.query.country
  const city = req.query.city
  const categoryFilter = category ? { category } : {}
  const countryFilter = country ? { country } : {}
  const cityFilter = city ? { city } : {}
  const tours = await Tour.find({ ...categoryFilter, ...countryFilter, ...cityFilter})
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

tourRouter.get('/cityInTheCountry', async (req, res) => {
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
  const tour = await Tour.findById(req.params.id).populate('comments.user')
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
    country: 'country',
    city: 'city'
  })
  const createdTour = await tour.save()
  res.send({ message: 'Tour created', tour: createdTour})
})

tourRouter.put('/:id', isAuth, isAdmin, async (req, res) => {
  
  const tourId = req.params.id
  const tour = await Tour.findById(tourId)
  console.log('put', req.body.image)
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
    tour.imageGallery = req.body.uploadedImage
    console.log(tour)
    const updatedTour = await tour.save()
    console.log(tour)
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





