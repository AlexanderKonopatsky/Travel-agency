const { Schema, model } = require('mongoose')

const categorySchema = new Schema(
  {
    categoryName: { type: String, required: true },
    description: { type: String, required: true },
  }
)

const commentsSchema = new Schema(
   {
     user: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
     comment: { type: String, required: true },
     rating: { type: Number, required: false },
     isActive: { type: Boolean, default: true, required: false },
   },
   {
     timestamps: true,
   }
 )

 const attractionSchema = new Schema(
   {
     titleAttraction: { type: String, required: true },
     descAttraction: { type: String, required: false },
     imageAttraction: { type: String, required: true },
     adressAttraction: { type: String, required: true },
     lon: { type: Number, required: false }, 
     lat: { type: Number, required: false }, 
   }
 )


 const availableSeats = new Schema(
   {
     startDate: { type: Date },
     endDate: { type: Date },
     availableSeats: { type: Number }, 
     reservedSeats: { type: Number }, 
   }
 )

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
    city: { type: String, required: false },
    cityT: { type: Schema.Types.ObjectId, ref: 'City', required: false },
    comments: [commentsSchema],
    attractions: [attractionSchema],
    categoryS: { type: Schema.Types.ObjectId, ref: 'Сategories', required: false },
    imageGallery: [
      {
          type: String,
          required: false,
      },
    ],
    availableSeats: [availableSeats],
  },
  {
    timestamps: true
  }
)

module.exports = model('Tours', tourSchema)

