require('dotenv').config()
const ApiError = require("../error/apiError");
const userService = require("../service/user-service");
const {validationResult} = require('express-validator');

class UserController {
    async registration(req, res, next) {
        const {email, password} = req.body;
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.badRequest("Введённые данные не корректны.."));
            }
            const data = await userService.registration(email, password);
            res.cookie("refreshToken", data.refreshToken, {maxAge: 30*24*60*1000, httpOnly: true});
            return res.json(data);
        } catch (e) {
            return next(ApiError.badRequest(e));
        }
    }

    async login(req, res, next) {
        const {email, password} = req.body;
        try {
            const data = await userService.login(email, password);
            res.cookie("refreshToken", data.refreshToken, {maxAge: 30*24*60*1000, httpOnly: true});
            return res.json(data);
        } catch (e) {
            return next(ApiError.badRequest(e));
        }
    }

    async logout(req, res, next) {
        try {

        } catch (e) {
            return next(ApiError.badRequest(e));
        }
    }

    async refresh(req, res, next) {
        const {refreshToken} = req.cookies;
        try {
            const data = await userService.refresh(refreshToken);
            res.cookie("refreshToken", data.refreshToken, {maxAge: 30*24*60*1000, httpOnly: true});
            return res.json(data);
        } catch (e) {
            return next(ApiError.badRequest(e));
        }
    }

    async getAll(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            return next(ApiError.badRequest(e));
        }
    }

    async check(req, res, next) {
        const {id} = req.query;
        if (!id) {
            return next(ApiError.badRequest("id не указан!"));
        }
    }
}

module.exports = new UserController();