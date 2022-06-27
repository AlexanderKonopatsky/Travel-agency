const express = require('express')
const Tour = require('../models/tourModel')
const User = require('../models/userModel')
const commentRouter = express.Router()
const { isAuth, isAdmin } = require('../middleware/utils')
var mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;


commentRouter.post('/:id', isAuth, async (req, res) => {
  const tourId = req.params.id
  const tour = await Tour.findById(tourId)
  if (tour) {
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
    res.status(201).send({ message: 'Comment created', comment: updatedTour.comments[updatedTour.comments.length - 1]})
  } else {
    res.status(404).send({ message: 'Tour not found' })
  }
})

commentRouter.get('/:id', async (req, res) => {
  const tourId = req.params.id
  const tour = await Tour.findById(tourId).populate('comments.user')
  if (tour) {
    res.status(201).send(tour.comments)
  } else {
    res.status(404).send({ message: 'Tour not found' })
  }
})

commentRouter.put('/:id/tourId/:tourId',  isAuth, isAdmin, async (req, res) => {
  const commentId = req.params.id
  const tourId = req.params.tourId
  const status = req.query.status
  let statusValue, rating
  if (status === 'disable') statusValue = false 
  if (status === 'enable') statusValue = true 

  await Tour.updateOne(
        { _id: tourId, "comments._id": commentId},
        { $set: { "comments.$.isActive" : statusValue} })

  const tour = await Tour.aggregate([
    { $match: {_id: ObjectId(tourId)}},
    { $unwind: '$comments'},
    { $match: {'comments.isActive': true}}])
  
  if (tour.length !== 0 ) 
    rating = (tour.reduce((sum, current) =>  current.comments.rating + sum, 0 ) / tour.length).toFixed(2)
  else 
    rating = 0
  
  await Tour.updateOne({ _id: tourId },{ $set: { "numReviews" : tour.length, "rating" : rating } })
  res.send({ message : `Comment ${commentId} was ${status}`})
})

commentRouter.delete('/:id/tourId/:tourId', isAuth, isAdmin, async (req, res) => {

  const commentId = req.params.id
  const tourId = req.params.tourId
  var commentIdObjectId = mongoose.Types.ObjectId(commentId);
  await Tour.findByIdAndUpdate(tourId, {'$pull': { 'comments': {'_id': commentIdObjectId },  }}); 
  const tour = await Tour.findById(tourId)
  if (tour.numReviews != 0) {
    tour.numReviews--
  } else {
    tour.numReviews = 0
  }
  await tour.save()
  res.send({ message: "Order deleted" })
  
})


module.exports = commentRouter





