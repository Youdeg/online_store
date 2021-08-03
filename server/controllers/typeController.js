const ApiError = require("../error/apiError");
const typeService = require("../service/type-service");

class TypeController {
    async createNew(req, res, next) {
        const {name} = req.body;
        try {
            const type = await typeService.create(name);
            return res.json(type);
        } catch (e) {
            return next(ApiError.badRequest(e));
        }
    }

    async getAll(req, res, next) {
        try {
            const types = await typeService.getAll();
            return res.json(types);
        } catch (e) {
            return next(ApiError.badRequest(e));
        }
    }
}

module.exports = new TypeController();