const express = require('express')
const Country = require('../models/countryModel')
const { isAuth, isAdmin } = require('../middleware/utils')
const countryRouter = express.Router()



countryRouter.get('/', async (req, res) => {
  const country = await Country.find({})
  res.send({ country: country})
})

countryRouter.get('/search/:countryName', async (req, res) => {
   const countryName = req.params.countryName
   const country = await Country.findOne({'countryName': countryName})
   res.send({ country: country})
})
   
countryRouter.get('/countryName', async (req, res) => {
   const country = await Country.find({}).select('countryName')
   res.send({ country: country})
 })


countryRouter.post('/', isAuth, isAdmin, async (req, res) => {
   const country = new Country({
     countryName: req.body.country.countryName,
     countryDesc: req.body.country.countryDesc,
     countryImage: req.body.country.countryImage
   })
   const createdCountry = await country.save()
   res.send({ message: 'Country created', country: createdCountry})
 })

 countryRouter.put('/:id', isAuth, isAdmin, async (req, res) => {
   const countryId = req.params.id
   const country = await Country.findById(countryId)
   const countryBody = req.body.updatedCountry
 
   if (country) {
     country.countryName = countryBody.countryName
     country.countryDesc = countryBody.countryDesc
     country.countryImage = countryBody.countryImage.length !== 0 ? countryBody.countryImage :  country.countryImage 
     const updatedCountry = await country.save()
     res.send({ message: 'Country updated', country: updatedCountry})
   } else {
     res.status(404).send({ message: 'Country not found' })
   }
 })

 countryRouter.delete('/:id', isAuth, isAdmin, async (req, res) => {
   const country = await Country.findById(req.params.id)
   if (country) {
     const deletedCountry = await country.remove()
     res.send({ message: 'Country deleted', country: deletedCountry })
   } else {
     res.status(404).send({ message: 'Country not found'})
   }
 })



module.exports = countryRouter





