const {Basket} = require("../models/models");
const BasketProductService = require('../service/basketProduct-service');

class BasketService {
    async create(userId) {
        return await Basket.create({userId: userId});
    }

    async getAllProducts(userId) {
        const basket = await Basket.findOne({where: {userId: userId }});
        return await BasketProductService.getProductsInBasket(basket.id);
    }

    async putProduct(userId, productId) {
        const basket = await Basket.findOne({where: {userId: userId}});
        return await BasketProductService.newProductInBasket(productId, basket.id);
    }

    async deleteProduct(userId, productId) {
        const basket = await Basket.findOne({where: {userId: userId}});
        await BasketProductService.deleteProductFromBasket(productId, basket.id);
        return await this.getAllProducts(userId);
    }

    async emptyBasket(userId) {
        const basket = await Basket.findOne({where: {userId: userId}});
        await BasketProductService.deleteAllProductsFromBasket(basket.id);
    }
}

module.exports = new BasketService();