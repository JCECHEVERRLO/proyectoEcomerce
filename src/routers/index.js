const express = require('express')
const productsRouter = require('./products.router')

function routerApi(app){
    //const router = express.Router()
    app.use('/products', productsRouter)
    //router.use('/events', productsRouter)
}

module.exports = routerApi