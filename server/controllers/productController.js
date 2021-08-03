const ApiError = require("../error/apiError");
const productService = require("../service/product-service");

class ProductController {
    async createNew(req, res, next) {
        const {name, typeId, authorId, price, img} = req.body;
        try {
            const product = await productService.create(name, typeId, authorId, price, img);
            return res.json(product);
        } catch (e) {
            return next(ApiError.badRequest(e));
        }
    }

    async getAll(req, res, next) {
        let {typeId, authorId, limit, page} = req.query;
        try {
            const products = await productService.get(typeId, authorId, limit, page);
            return res.json(products);
        } catch (e) {
            return next(ApiError.badRequest(e));
        }
    }

    async getOne(req, res, next) {
        const {id} = req.params;
        try {
            const product = await productService.getOne(id);
            return res.json(product);
        } catch (e) {
            return next(ApiError.badRequest(e));
        }
    }
}

module.exports = new ProductController();