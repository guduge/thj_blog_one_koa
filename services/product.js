const Product = require('../models/index').getModel('product')

const product = {
    /**
     * @Description: ��¼
     * @date 2019/5/30
     * @params: { Object } userData
     * @return: { Object | null }
     */
    async getProductList () {
        let result = await Product.find()
        console.log(result)
        return result
    },
    async getProductItem (product) {
        let result = await Product.findOne(product)
        console.log(result)
        return result
    },
    async addProductItem(product) {
        let result = await Product.create(product)
        console.log(result)
        return result
    }
}

module.exports = product