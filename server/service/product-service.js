const {Product} = require("../models/models");

class ProductService {
    async create(name, typeId, authorId, price, img) {
        return await Product.create({name, typeId, authorId, price, img});
    }

    async get(typeId, authorId, limit, page) {
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        let products;
        if (typeId && authorId) {
            products = await Product.findAndCountAll({where: {typeId, authorId}, limit, offset});
        }
        if (!typeId && authorId) {
            products = await Product.findAndCountAll({where: {authorId}, limit, offset});
        }
        if (typeId && !authorId) {
            products = await Product.findAndCountAll({where: {typeId}, limit, offset});
        }
        if (!typeId && !authorId) {
            products = await Product.findAndCountAll({limit, offset});
        }
        return products;
    }

    async getOne(id) {
        return await Product.findOne({where: {id}});
    }
}

module.exports = new ProductService();