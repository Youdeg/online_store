const Router = require("express");
const router = new Router();
const AuthorController = require('../controllers/authorController');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const AdminRoleCheckMiddleware = require('../middleware/AdminRoleCheckMiddleware');

router.post('/', AuthMiddleware, AdminRoleCheckMiddleware, AuthorController.createNew);
router.get('/', AuthorController.getAll);

module.exports = router;