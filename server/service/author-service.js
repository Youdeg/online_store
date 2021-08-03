const {Author} = require("../models/models");

class AuthorService {
    async create(name) {
        const candidate = await Author.findOne({where: {name}});
        if (candidate) {
            throw new Error('Автор с таким именем уже существует!');
        }
        return  await Author.create({name});
    }

    async getAll() {
        return await Author.findAll();
    }
}

module.exports = new AuthorService();