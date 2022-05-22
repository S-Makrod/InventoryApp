const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Inventory item must have a name!'],
        minlength: 1
    },
    creator: {
        type: String,
        required: [true, 'Inventory item must have a requester!'],
    },
    details : {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
})

itemSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Item', itemSchema)