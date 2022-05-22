const mongoose = require('mongoose')

const inStockItemSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: [true, 'An item must be specified!']
    },
    quantity:{
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
})

inStockItemSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('InStockItem', inStockItemSchema)