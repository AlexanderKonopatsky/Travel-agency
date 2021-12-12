const express = require('express')
const Tour = require('../models/tourModel')
const commentRouter = express.Router()
const { isAuth, isAdmin } = require('../utils')
var mongoose = require('mongoose');



commentRouter.post('/:id', isAuth, async (req, res) => {
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


/* commentRouter.get('/tourId/:id', async (req, res) => {
  console.log('13123123')
  const tourId = req.params.id
  const tour = await Tour.findById(tourId, { 'isActive' : true }).populate('comments.user')
  if (tour) {
    res.status(201).send(tour.comments)
  } else {
    res.status(404).send({ message: 'Tour not found' })
  }
}) */


commentRouter.get('/tourId/:id', async (req, res) => {
  console.log('comment router')
  const tour = await Tour.findById(req.params.id).populate('comments.user')
  console.log(tour)
  if (tour) {
    res.send(tour)
  } else {
    res.status(404).send({message: 'Tour not Found'})
  }
})

commentRouter.put('/:id/tourId/:tourId',  async (req, res) => {
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
    tour.rating = (activeTour.reduce((a, c) => c.rating + a, 0 ) / activeTour.length).toFixed(2)
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
  const deletedComment = await Tour.findByIdAndUpdate(tourId, {'$pull': { 'comments': {'_id': commentIdObjectId} }}); 
  res.send({ message: "Order deleted" })
})


module.exports = commentRouter





