const ApiError = require("../error/apiError");

module.exports = function (err, req, res, next) {
    console.log(err);
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message});
    }
    return err.status(500).json({message: "Непредвиденная ошибка"});
}
