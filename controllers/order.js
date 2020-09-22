'use strict'
const mongoose = require('mongoose'); 
const config = require('../config')
const orderService = require('../services').order
const { InvalidQueryError } = require('../lib/error')
const order = {}
order.getOrderList = async (ctx, next) => {
    const {user_id} = ctx.request.query
    if (!user_id) {
        throw new InvalidQueryError()
    }
    console.log(user_id)
    var ObjectId = mongoose.Types.ObjectId; 
    try {
        let userId =  new ObjectId(user_id);
        const list = await orderService.getOrderList(userId)
        ctx.result = list
        ctx.msg = '获取成功'
    } catch(e) {
        throw new InvalidQueryError()
    }
    return next()
}
order.createOrder = async (ctx, next) => {
    /** user_id: mongoose.Schema.Types.ObjectId,
    orderId: String, //订单号
    totoal_price: Number, // 用户名
    title: String, // 订单标题
    state: String, //状态
    create_date:String,       //创建时间
    update_date:String,      //更新时间
    order_items:Array, //订单项目
    address: Object, //地址信息
     */
    const { title, order_items,address} = ctx.request.body
    if (!title || !order_items  || !address ) {
        throw new InvalidQueryError()
    }
    const order = await orderService.createOrder({
        title: title,
        order_items: order_items,
        address: address,
    })
    if (!order) {
        ctx.result = ''
        ctx.msg = '添加失败'
    } else {
        ctx.result = 'success'
        ctx.msg = '添加成功'
    }
    return next()
}
module.exports = order
