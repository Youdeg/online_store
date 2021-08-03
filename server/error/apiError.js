class ApiError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }

    static badRequest(message) {
        return new ApiError(404, message);
    }

    static forbidden(message) {
        return new ApiError(403, message);
    }

    static unauthorizedError() {
        return new ApiError(403, "Пользователь не авторизован");
    }
}

module.exports = ApiError;