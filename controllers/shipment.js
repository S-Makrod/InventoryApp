const shipmentRouter = require('express').Router()

const StockItem = require('../models/stock_item')
const ShippedItem = require('../models/shipped_item')
const Shipment = require('../models/shipment')

const middleware = require('../utils/middleware')

shipmentRouter.get('/', async (req, res) => {
    const shipments = await Shipment.find({}).populate({ path: 'items', populate: { path: 'item' } })
    res.json(shipments)
})

shipmentRouter.get('/:id', async (req, res) => {
    const shipment = await Shipment.findById(req.params.id).populate({ path: 'items', populate: { path: 'item' } })
    if (shipment) {
        res.json(shipment)
    } else {
        res.status(404).send({ err: 'Shipment does not exist' }).end()
    }
})
  
shipmentRouter.post('/', async (req, res) => {
    const body = req.body
    const itemsToShip = body.items
    const shipList = []
    try {
        for(i = 0; i < itemsToShip.length; i++) {
            const item = itemsToShip[i]
            const stockItem = await StockItem.findById(item.id).populate('item')
            stockItem.quantity = stockItem.quantity - Math.floor(item.quantity)
            stockItem.save()

            const shippedItem = new ShippedItem({
                item: stockItem.item.id,
                quantity: Math.floor(item.quantity)
            })
            const savedShippedItem = await shippedItem.save()

            shipList.push(savedShippedItem.id)
        }

        const shipment = new Shipment({
            name: body.name,
            details: body.details,
            to: body.to,
            items: shipList
        })
        const savedShipment = await shipment.save()

        const populatedSavedShipment = await Shipment.findById(savedShipment.id).populate({ path: 'items', populate: { path: 'item' } })
        res.status(201).json(populatedSavedShipment)
    } catch {
        throw Error('Bad request')
    }
})

shipmentRouter.put('/:id', async (req, res) => {
    const info = req.body
    const shipment = await Shipment.findById(req.params.id)

    if(!shipment) res.status(404).send({ err: 'Shipment does not exist' }).end()

    try {
        shipment.details = info.details
        shipment.to = info.to

        const savedShipment = await shipment.save()

        const populatedSavedShipment = await Shipment.findById(savedShipment.id).populate({ path: 'items', populate: { path: 'item' } })
        res.json(populatedSavedShipment)
    } catch {
        throw Error('Bad request')
    }
})

shipmentRouter.delete('/:id', async (req, res) => {
    const shipment = await Shipment.findById(req.params.id).populate({ path: 'items', populate: { path: 'item' } })
    
    if(!shipment) res.status(404).send({ err: 'Shipment does not exist' }).end()

    for(i = shipment.items.length - 1; i >= 0; i--) {
        const item = shipment.items[i]
        const stockItem = await StockItem.findOne({ item: item.item.id })
        stockItem.quantity = stockItem.quantity + item.quantity
        await stockItem.save()

        await ShippedItem.findByIdAndRemove(item.id) 
    }

    await Shipment.findByIdAndRemove(req.params.id)

    res.status(204).end()
})

module.exports = shipmentRouter