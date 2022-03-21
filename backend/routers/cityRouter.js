const express = require('express')
const City = require('../models/cityModel')
const Country = require('../models/countryModel')
const { isAuth, isAdmin } = require('../middleware/utils')
const cityRouter = express.Router()



cityRouter.get('/', async (req, res) => {
  const city = await City.find({}).populate('country', 'countryName')
  res.send({ city: city})
})


cityRouter.post('/', isAuth, isAdmin, async (req, res) => {
   let idCountry = await Country.findOne({countryName:  req.body.city.country})
   const city = new City({
     cityName: req.body.city.cityName,
     cityDesc: req.body.city.cityDesc,
     cityImage: req.body.city.cityImage,
     country: idCountry
   })

   const createdCity = await city.save()
   res.send({ message: 'City created', city: createdCity})
 })

 cityRouter.put('/:id', isAuth, isAdmin, async (req, res) => {

   const cityId = req.params.id
   const city = await City.findById(cityId)
   const cityBody = req.body.updatedCity
 /*   let idCountry = await Country.findOne({countryName:  req.body.city.country}) */
  console.log('updatedCity', cityBody)
  let idCountry
  if (cityBody.country !== '') {
    idCountry = await Country.findOne({countryName:  cityBody.country})
  }
   if (city) {
     city.cityName = cityBody.cityName
     city.cityDesc = cityBody.cityDesc
     city.cityImage = cityBody.cityImage.length !== 0 ? cityBody.cityImage :  city.cityImage 
     if (idCountry) city.country = idCountry
     const updatedCity = await city.save()
     res.send({ message: 'City updated', city: updatedCity})
   } else {
     res.status(404).send({ message: 'City not found' })
   }
 })

 cityRouter.delete('/:id', isAuth, isAdmin, async (req, res) => {
   const city = await City.findById(req.params.id)
   if (city) {
     const deletedCity = await city.remove()
     res.send({ message: 'City deleted', city: deletedCity })
   } else {
     res.status(404).send({ message: 'City not found'})
   }
 })

 cityRouter.get('/cityName', async (req, res) => {

   const city = await City.find({}).select('cityName')
   res.send({ city: city})
 })


 cityRouter.get('/:cityName', async (req, res) => {
   const cityName = req.params.cityName
   const city = await City.findOne({'cityName': cityName})
   console.log(city)
   res.send({ city: city})
})
   

module.exports = cityRouter





