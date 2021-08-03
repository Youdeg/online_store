require("dotenv").config();
const {User} = require('../models/models');
const tokenService = require("../service/token-service");
const basketService = require("../service/basket-service");
const bcrypt = require('bcrypt');

class UserService {
    async registration(email, password) {
        const candidate = await User.findOne({where: {email}});
        console.log("a");
        if (candidate) {
            throw new Error('Пользователь с таким email уже существует!');
        }
        const hashPassword = await bcrypt.hash(password, process.env.SALT);
        const user = await User.create({email, password: hashPassword, role: "ADMIN"});

        const basket = await basketService.create(user.id);

        return await tokenService.updateTokens(user);
    }

    async login(email, password) {
        const user = await User.findOne({where: {email}});
        if (!user) {
            throw new Error('Пользователь с таким email уже существует!');
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new Error('Неверный пароль.');
        }

        return await tokenService.updateTokens(user);
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new Error('Токен не действителен');
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw new Error("Пользователь не авторизован");
        }
        const user = await User.findOne({where: {id: userData.id}});
        return await tokenService.updateTokens(user);
    }

    async getAllUsers() {
        return await User.findAll();
    }
}

module.exports = new UserService();