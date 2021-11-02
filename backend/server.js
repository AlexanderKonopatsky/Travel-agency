const express = require('express')

data = {
  tours: [
    {
      _id: '1', 
      src: '/images/img-1.jpg',
      text: 'Tower of London Tour',
      label: 'label',
      path: '/',
      desc: 'Survey the stories behind the beheadings, Beefeaters, and Crown Jewels in Londons famous tower',
      rating: 4.5,
      additionalInfo: 'This three-hour Tower of London tour, led by an expert historian, uses the Tower as a backdrop for understanding and discussing British history and culture. Together, well unpack the many roles the ',
      price: 342,
      numReviews: 32
      
    },
    {
      _id: '2', 
      src: '/images/img-2.jpg',
      text: 'Tower of London Tour For Kids',
      label: 'label',
      path: '/',
      desc: 'Discover the Tower of London for all ages',
      rating: 3,
      additionalInfo: 'The Tower of London is one of Londons most famous landmarks. Known for its feathered inhabitants, its gruesome executions, and its famous prisoners, the Tower is the site of intriguing stories that inspire and fascinate young visitors.',
      price: 853,
      numReviews: 12
    },
    {
      _id: '3', 
      src: '/images/img-4.jpg',
      text: 'London History Tour: Portrait of a City',
      label: 'label',
      path: '/ ',
      desc: 'Uncover Londons 2,000-year history in the company of a local historian on this London City Tour, broadly covering the history of Englands capital. Providing an overview of London from Roman outpost to cutting-edge world capital, this walk',
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