const mongoose = require('mongoose')

const shipmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1
    },
    details : {
        type: String,
        required: false
    },
    to : {
        type: String,
        required: true
    },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ShippedItem'
        }
    ]
})

shipmentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Shipment', shipmentSchema)