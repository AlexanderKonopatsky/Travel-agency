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
   let reqBody = req.body.city
   const city = new City({
     cityName: reqBody.cityName,
     cityDesc: reqBody.cityDesc,
     cityImage: reqBody.cityImage,
     country: idCountry,
     lon: reqBody.lon,
     lat: reqBody.lat
   })

   const createdCity = await city.save()
   res.send({ message: 'City created', city: createdCity})
 })

 cityRouter.put('/:id', isAuth, isAdmin, async (req, res) => {

   const cityId = req.params.id
   const city = await City.findById(cityId)
   const cityBody = req.body.updatedCity
   let idCountry
   if (cityBody.country !== '') {
     idCountry = await Country.findOne({countryName:  cityBody.country})
   }
   if (city) {
     city.cityName = cityBody.cityName
     city.cityDesc = cityBody.cityDesc
     city.cityImage = cityBody.cityImage.length !== 0 ? cityBody.cityImage :  city.cityImage 
     city.lon = cityBody.lon
     city.lat = cityBody.lat
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
   res.send({ city: city})
})
   

module.exports = cityRouter





