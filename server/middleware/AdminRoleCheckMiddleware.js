const ApiError = require('../error/apiError');
const TokenService = require('../service/token-service');

module.exports = function (req, res, next) {
    try {
        if (req.user.role !== "ADMIN") {
            return next(ApiError.forbidden("Нет доступа."));
        }
        next();
    } catch (e) {
        return next(ApiError.forbidden("Нет доступа."));
    }
}
