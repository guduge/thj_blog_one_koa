'use strict'
const mongoose = require('mongoose');

module.exports = {
  name: "order",
  schema: {
    user_id: mongoose.Schema.Types.ObjectId,
    orderId: String, //订单号
    totoal_price: Number, // 用户名
    title: String, // 密码
    state: String, //状态
    create_date:String,       //创建时间
    update_date:String,      //更新时间
    order_items:Array, //订单项目
    address: Object, //地址信息
  }
};
