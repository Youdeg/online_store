const ApiError = require("../error/apiError");
const authorService = require("../service/author-service");

class AuthorController {
    async createNew(req, res, next) {
        const {name} = req.body;
        try {
            const author = await authorService.create(name);
            return res.json(author);
        } catch (e) {
            return next(ApiError.badRequest(e));
        }
    }

    async getAll(req, res, next) {
        try {
            const authors = await authorService.getAll();
            return res.json(authors);
        } catch (e) {
            return next(ApiError.badRequest(e));
        }
    }
}

module.exports = new AuthorController();