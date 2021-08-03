const {BasketProduct, Product} = require("../models/models");

class BasketProductService {
    async getProductsInBasket(basketId) {
        return await BasketProduct.findAll({where: {basketId: basketId }, include: Product});
    }

    async newProductInBasket(productId, basketId) {
        const product = await BasketProduct.create({basketId: basketId, productId: productId});
        return await BasketProduct.findOne({where: { id: product.id }, include: Product})
    }

    async deleteProductFromBasket(id, basketId) {
        return await BasketProduct.destroy({where: { id: id, basketId: basketId } });
    }

    async deleteAllProductsFromBasket(basketId) {
        return await BasketProduct.destroy({where: { basketId: basketId } });
    }
}

module.exports = new BasketProductService();