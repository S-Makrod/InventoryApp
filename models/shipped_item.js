const mongoose = require('mongoose')

const ShippedItemSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: [true, '']
    },
    quantity:{
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
})

ShippedItemSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('ShippedItem', ShippedItemSchema)