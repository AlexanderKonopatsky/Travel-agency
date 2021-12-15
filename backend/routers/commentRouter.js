const express = require('express')
const Tour = require('../models/tourModel')
const User = require('../models/userModel')
const commentRouter = express.Router()
const { isAuth, isAdmin } = require('../middleware/utils')
var mongoose = require('mongoose');



commentRouter.post('/:id', isAuth, async (req, res) => {
  const tourId = req.params.id
  const tour = await Tour.findById(tourId)
  if (tour) {
    console.log('userid', req.user._id)
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
  console.log('commetn router ')
  const commentId = req.params.id
  const tourId = req.params.tourId
  const status = req.query.status
  let statusValue 
  if (status === 'disable') statusValue = false 
  if (status === 'enable') statusValue = true 
  const tour = await Tour.findById(tourId)
  if (tour) {
    const arrComments = tour.comments.map(comment => {
      if (comment._id.toString() === commentId ) {
        comment.isActive = statusValue 
      }
        return comment
      }
    )
    let activeTour = arrComments.filter(comment => {
    return comment.isActive !== false
    })
    tour.comments = arrComments
    if (status == 'enable') { tour.numReviews++ } else {  tour.numReviews--}
    if (tour.numReviews === 0) {
      tour.rating = 0
    } else {
      tour.rating = (activeTour.reduce((a, c) => c.rating + a, 0 ) / activeTour.length).toFixed(2)
    }

    await tour.save()
    res.send({ message : `Comment ${commentId} was ${status}`})
  } else {
    res.status(404).send({ message : "Tour not found"})
  }
})

commentRouter.delete('/:id/tourId/:tourId', isAuth, isAdmin, async (req, res) => {

  const commentId = req.params.id
  const tourId = req.params.tourId
  var commentIdObjectId = mongoose.Types.ObjectId(commentId);
  await Tour.findByIdAndUpdate(tourId, {'$pull': { 'comments': {'_id': commentIdObjectId },  }}); 
  const tour = await Tour.findById(tourId)
  if (tour.numReviews != 0) {
    tour.numReviews--
    await tour.save()
  }
  res.send({ message: "Order deleted" })
})


module.exports = commentRouter





