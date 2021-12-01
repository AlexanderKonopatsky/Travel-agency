const express = require('express')
const Tour = require('../models/tourModel')
const tourRouter = express.Router()
const { isAuth, isAdmin } = require('../utils')

tourRouter.get('/', async (req, res) => {
  const tours = await Tour.find({})
  res.send(tours)
})

tourRouter.get('/:id', async (req, res) => {
  const tour = await Tour.findById(req.params.id)
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
    desc:"Discover the Tower of London for all ages",
    additionalInfo: "The Tower of London is one of Londons most famous landmarks. Known for...",
    price: 853,
    rating: 3,
    numReviews: 12
  })
  const createdTour = await tour.save()
  res.send({ message: 'Tour created', tour: createdTour})
})

module.exports = tourRouter





