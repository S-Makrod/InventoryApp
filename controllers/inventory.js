const inventoryRouter = require('express').Router()

const Item = require('../models/item')
const StockItem = require('../models/stock_item')

const middleware = require('../utils/middleware')

inventoryRouter.get('/', async (req, res) => {
    const items = await StockItem.find({}).populate('item')
    res.json(items)
})

inventoryRouter.get('/:id', async (req, res) => {
    const item = await StockItem.findById(req.params.id).populate('item')
    if (item) {
        res.json(item)
    } else {
        res.status(404).send({ err: 'Inventory item does not exist.'}).end()
    }
})

inventoryRouter.put('/:id', async (req, res) => {
    const item = req.body
    const stockItem = await StockItem.findById(req.params.id).populate('item')

    if(!stockItem) res.status(404).send({ err: 'Inventory item does not exist.'}).end()
    
    try {
        stockItem.quantity = Math.floor(item.quantity)
        stockItem.save()

        const updatedItem = {
            name: item.name,
            creator: item.creator,
            details: item.details,
            price: item.price
        }
        await Item.findByIdAndUpdate(stockItem.item.id, updatedItem, { runValidators: true })

        const updatedStockItem = await StockItem.findById(req.params.id).populate('item')
        res.json(updatedStockItem)
    } catch {
        throw Error('Bad request')
    }
})
  
inventoryRouter.post('/', async (req, res) => {
    const item = req.body
    try {
        const newItem = new Item({
            name: item.name,
            creator: item.creator,
            details: item.details,
            price: item.price
        })
        const savedItem = await newItem.save()
    
        const stockItem = new StockItem({
            item: savedItem.id,
            quantity: Math.floor(item.quantity)
        })
        const savedStockItem = await stockItem.save()
    
        const populatedSavedStockItem = await StockItem.findById(savedStockItem.id).populate('item')
        res.status(201).json(populatedSavedStockItem)
    } catch {
        throw Error('Bad request')
    }
})

inventoryRouter.delete('/:id', async (req, res) => {
    await StockItem.findByIdAndRemove(req.params.id)
    res.status(204).end()
})

module.exports = inventoryRouter