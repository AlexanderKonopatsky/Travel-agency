const { Schema, model } = require('mongoose')

const tourSchema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    label: { type: String, required: true },
    desc: { type: String, required: true },
    additionalInfo: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    country: { type: String, required: true },
  },
  {
    timestamps: true
  }
)

module.exports = model('Tours', tourSchema)

