const ApiError = require("../error/apiError");
const basketService = require("../service/basket-service");

class BasketController {
    async getProducts(req, res, next) {
        const {id} = req.user;
        try {
            const products = await basketService.getAllProducts(id);
            return res.json(products);
        } catch (e) {
            return next(ApiError.badRequest(e));
        }
    }

    async newProduct(req, res, next) {
        const {id} = req.user;
        const {productId} = req.body;
        try {
            const product = await basketService.putProduct(id, productId);
            return res.json(product);
        } catch (e) {
            return next(ApiError.badRequest(e));
        }
    }

    async deleteProduct(req, res, next) {
        const {id} = req.user;
        const {productId} = req.body;
        try {
            const product = await basketService.deleteProduct(id, productId);
            return res.json(product);
        } catch (e) {
            return next(ApiError.badRequest(e));
        }
    }

    async emptyBasket(req, res, next) {
        const {id} = req.user;
        try {
            await basketService.emptyBasket(id);
            return res.json({});
        } catch (e) {
            return next(ApiError.badRequest(e));
        }
    }
}

module.exports = new BasketController();