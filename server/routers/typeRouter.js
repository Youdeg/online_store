const Router = require("express");
const router = new Router();
const TypeController = require("../controllers/typeController");
const AuthMiddleware = require('../middleware/AuthMiddleware');
const AdminRoleCheckMiddleware = require('../middleware/AdminRoleCheckMiddleware');

router.post('/', AuthMiddleware, AdminRoleCheckMiddleware, TypeController.createNew);
router.get('/', TypeController.getAll);

module.exports = router;