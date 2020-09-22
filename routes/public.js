'use strict'

const Router = require('koa-router')
const controllers = require('../controllers')
const router = new Router()
router.prefix('/api')
router.post('/login', controllers.login.login)
router.post('/register', controllers.register.register)
router.post('/upload', controllers.upload.upload)
router.post('/addProductItem', controllers.product.addProductItem)
router.get('/getProductList', controllers.product.getProductList)
router.post('/createOrder', controllers.order.createOrder)
router.get('/getOrderList', controllers.order.getOrderList)


module.exports = router
