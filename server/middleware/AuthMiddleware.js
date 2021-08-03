const ApiError = require('../error/apiError');
const TokenService = require('../service/token-service');

module.exports = function (req, res, next) {
    try {
        const authorizedHeader = req.headers.authorization;
        if (!authorizedHeader) {
            return next(ApiError.unauthorizedError());
        }
        const accessToken = authorizedHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.unauthorizedError());
        }

        const userData = TokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.unauthorizedError());
        }

        req.user = userData;
        next();
    } catch (e) {
        return next(ApiError.unauthorizedError());
    }
}