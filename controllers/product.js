'use strict'

const config = require('../config')
const productService = require('../services').product
const { InvalidQueryError } = require('../lib/error')
const product = {}
product.getProductList = async (ctx, next) => {
    const list = await productService.getProductList()
    ctx.result = list
    ctx.msg = '获取成功'
    return next()
}
product.getProductItem = async (ctx, next) => {

    return next()
}
product.addProductItem = async (ctx, next) => {
    /**title: String, // 标题
        picUrl: String, // 图片链接
        des: String, // 产品描述
        htmlUrl: String,// 富文本链接
     */
    const { title, picUrl,des, htmlUrl} = ctx.request.body
    if (!title || !picUrl || !des || !htmlUrl) {
        throw new InvalidQueryError()
    }
    const productItem = await productService.addProductItem({
        title: title,
        picUrl: picUrl,
        des: des,
        htmlUrl:htmlUrl
    })
    if (!productItem) {
        ctx.result = ''
        ctx.msg = '添加失败'
    } else {
        ctx.result = 'success'
        ctx.msg = '添加成功'
    }
    return next()
}
module.exports = product
