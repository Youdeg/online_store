require("dotenv").config()
const jwt = require("jsonwebtoken");
const {Token} = require("../models/models");
const UserDto = require("../dtos/user-dto");

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn:'30m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn:'30d'});
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({where: {userId}});
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        return await Token.create({userId, refreshToken});
    }

    async updateTokens(user) {
        const userDto = new UserDto(user);
        const tokens = await this.generateTokens({...userDto});
        await this.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }

    async removeToken(refreshToken) {
        return await Token.destroy({where: {refreshToken}});
    }

    async findToken(refreshToken) {
        return await Token.findOne({where: {refreshToken}});
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        } catch (e) {
            return null;
        }
    }

}

module.exports = new TokenService();