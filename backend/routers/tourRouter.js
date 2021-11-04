const express = require('express')
const Tour = require('../models/tourModel')
const tourRouter = express.Router()


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


module.exports = tourRouter





