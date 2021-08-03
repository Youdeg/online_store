const Router = require("express");
const router = new Router();

const ProductController = require("../controllers/productController");
const AuthMiddleware = require('../middleware/AuthMiddleware');
const AdminRoleCheckMiddleware = require('../middleware/AdminRoleCheckMiddleware');


router.post('/', AuthMiddleware, AdminRoleCheckMiddleware, ProductController.createNew);
router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getOne);

module.exports = router;