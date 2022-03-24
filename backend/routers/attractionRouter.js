const express = require('express')
const Tour = require('../models/tourModel')
const attractionRouter = express.Router()
const { isAuth, isAdmin } = require('../middleware/utils')

const ObjectId = require('mongodb').ObjectID;

attractionRouter.post('/', isAuth, isAdmin, async (req, res) => {

   const tourId = req.body.tourId
   const tour = await Tour.findById(tourId)
   if (tour) {
      const attraction = {
         titleAttraction: req.body.titleAttraction,
         descAttraction: req.body.descAttraction,
         imageAttraction: req.body.imageAttraction,
         adressAttraction: req.body.adressAttraction,
         lon : req.body.coordinates[0],
         lat : req.body.coordinates[1]
      }
      tour.attractions.push(attraction)
      const updatedTour = await tour.save()
      res.status(201).send({ message: 'Attraction created', attraction})
   } else {
      res.status(404).send({ message: 'Tour not found' })
   }
 })

 attractionRouter.get('/:tourId', async (req, res) => {
   const attractions = await Tour.findById(req.params.tourId).select('attractions')
   if (attractions) {
      res.send({ attractions })
   } else {
      res.status(404).send({ message: 'Tour not found'})
   }
 })



 attractionRouter.delete('/:tourId/:attractionId', isAuth, isAdmin, async (req, res) => {
   const tourId = req.params.tourId
   const attractionId = req.params.attractionId
   await Tour.findByIdAndUpdate(tourId, {
      '$pull': {
          'attractions':{ '_id': new ObjectId(attractionId) }
      }
   });
   res.send({ message: "Attraction deleted" })   
 })



 attractionRouter.put('/:tourId',  isAuth, isAdmin, async (req, res) => {
   const tourId = req.params.tourId
   const attractionId = req.body.attractionId
   await Tour.updateOne(
         { _id: tourId, "attractions._id": attractionId},
         { $set: { 
            "attractions.$" : req.body,
         } 
      })
   res.send({ message : `Attraction ${attractionId} was updated`}) 
 })


module.exports = attractionRouter





