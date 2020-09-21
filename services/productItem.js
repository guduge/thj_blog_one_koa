const ProductItem = require('../models/index').getModel('productItem')

const user = {
    /**
     * @Description: ��¼
     * @date 2019/5/30
     * @params: { Object } userData
     * @return: { Object | null }
     */
    async getProductList (product) {
        let result = await ProductItem.findOne(product)
        console.log(result)
        return result
    },
    async getProductItem (product) {
        let result = await ProductItem.findOne(product)
        console.log(result)
        return result
    },
    async addProductItem (product) {
        let result = await ProductItem.create(product)
        console.log(result)
        return result
    }
}

module.exports = user