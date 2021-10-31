const express = require('express')

data = {
  tours: [
    {
      _id: '1', 
      src: '/images/img-1.jpg',
      text: 'The Last',
      label: 'label',
      path: '/',
      desc: 'Luomo: Priva timers, or to reorient retThis three-hour introduction to Berlin is designed to provide a perfect introduction to Berlin for first timers, or to reorient ret',
      rating: 4.5,
      additionalInfo: 'Dop info',
      price: 342,
      numReviews: 32
      
    },
    {
      _id: '2', 
      src: '/images/img-2.jpg',
      text: 'The Last',
      label: 'label',
      path: '/',
      desc: 'Luomo: timers, or to reo timers, or to reorient retThis three-hour introduction to Berlin is designed to provrient retThis three-hour introduction to Berlin is designed to prov Private B timers, or to reorient retThis three-hour introduction to Berlin is designed to provoat Excursion',
      rating: 3,
      additionalInfo: 'Dop info',
      price: 853,
      numReviews: 12
    },
    {
      _id: '3', 
      src: '/images/img-4.jpg',
      text: 'The Last',
      label: 'label',
      path: '/ ',
      desc: 'Luomo: Pr timers, or to reorient retThis three timers, or to reorient retThis three-hour introduction to Berlin is designed to prov-hour introduction to Berlin is designed to provivat timers, or to reorient retThis three-hour introduction to Berlin is designed to prove Boat Excursion',
      rating: 2.5,
      additionalInfo: 'Dop info',
      price: 138,
      numReviews: 21
    },
  ]
}



const port = process.env.PORT || 5000
const app = express()

app.get('/', (req, res) => {
  res.send('server is ready')
})

app.get('/api/tours', (req, res) => {
  res.send(data.tours)
})

app.get('/api/tour/:id', (req, res) => {
  const tour = data.tours.find((x) => x._id === req.params.id)
  if (tour) {
    res.send(tour)
  } else {
    res.status(404).send({message: 'Tour not Found'})
  }
})


app.listen(port, () => {
  console.log(`http://localhost:${port}/`)
})