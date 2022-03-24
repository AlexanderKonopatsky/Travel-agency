const express = require('express')
const Tour = require('../models/tourModel')
const Category = require('../models/categoryModel')
const categoryRouter = express.Router()
const { isAuth, isAdmin } = require('../middleware/utils')


categoryRouter.get('/', async (req, res) => {
  const categories = await Category.find({})
  res.send({ categories: categories})
})

categoryRouter.get('/categoryName', async (req, res) => {
  const categories = await Category.find({}).select('categoryName')
  res.send({ categories: categories})
})

categoryRouter.get('/:categoryName', async (req, res) => {
   const categoryName = req.params.categoryName
   const category = await Category.findOne({'categoryName': categoryName})
   res.send({ category: category})
})


categoryRouter.post('/', isAuth, isAdmin, async (req, res) => {
  const category = new Category({
    categoryName: req.body.category.categoryName,
    categoryDesc: req.body.category.categoryDesc,
    categoryImage: req.body.category.categoryImage
  })
  const createdCategory = await category.save()
  res.send({ message: 'Category created', category: createdCategory})
})


categoryRouter.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const category = await Category.findById(req.params.id)
  if (category) {
    const deletedCategory = await category.remove()
    res.send({ message: 'Category deleted', category: deletedCategory })
  } else {
    res.status(404).send({ message: 'Category not found'})
  }
})

categoryRouter.put('/:id', isAuth, isAdmin, async (req, res) => {
  const categoryId = req.params.id
  const category = await Category.findById(categoryId)
  const categoryBody = req.body.updatedCategory

  if (category) {
    category.categoryName = categoryBody.categoryName
    category.categoryDesc = categoryBody.categoryDesc
    category.categoryImage = categoryBody.categoryImage.length !== 0 ? categoryBody.categoryImage :  category.categoryImage 
    const updatedCategory = await category.save()
    res.send({ message: 'Category updated', category: updatedCategory})
  } else {
    res.status(404).send({ message: 'Category not found' })
  }
})


module.exports = categoryRouter





