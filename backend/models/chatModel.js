const { Schema, model } = require('mongoose')

const messagesShema = new Schema(
   {
     _id: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
     body: { type: String},
     name: { type: String},
     lastName: { type: String},
     sAdmin: { type: Boolean },
   },
   {
     timestamps: true
   }
 )

const chatSchema = new Schema(
  {
   _id: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
   name: { type: String},
   lastName: { type: String},
   isAdmin: { type: Boolean },
   online: { type: Boolean},
   socketId: { type: String},
   messages: [messagesShema]
  },
  {
    timestamps: true
  }
)

module.exports = model('Chat', chatSchema)