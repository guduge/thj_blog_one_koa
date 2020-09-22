const mongoose = require('mongoose'); 
const Order = require('../models/index').getModel('order')

const order = {
    /**
     * @Description: ��¼
     * @date 2019/5/30
     * @params: { Object } userData
     * @return: { Object | null }
     */
    async getOrderList (user_id) {
        
        let result = await Order.find(
            {
                "user_id":user_id
            }
        )
        console.log(result)
        return result
    },
    /**
     * user_id: mongoose.Schema.Types.ObjectId,
     * orderId: String, //订单号
     * totoal_price: Number, // 用户名
     * title: String, // 密码
     * state: String, //状态
     * create_date:String,       //创建时间
     * update_date:String,      //更新时间
     * order_items:Array, //订单项目
     * address: Object, //地址信息
     */
    async createOrder(order){
        var ObjectId = mongoose.Types.ObjectId;   
        let user_id =  new ObjectId("5f61df5008cef4cebd248b5c");    
        let createDate = new Date();
        let result = await Order.create({
            title: order.title,
            order_items: order.order_items,
            address: order.address,
            user_id: user_id,
            create_date:createDate,
            update_date:createDate,
            state:"1",
            totoal_price: 111100,
            orderId: new ObjectId
        })
        console.log(result)
        return result
    } 
    
}

module.exports = order