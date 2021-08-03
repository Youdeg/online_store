const Router = require("express");
const router = new Router();
const basketController = require('../controllers/basketController');
const AuthMiddleware = require('../middleware/AuthMiddleware');


router.post('/', AuthMiddleware, basketController.newProduct);
router.get('/', AuthMiddleware, basketController.getProducts);
router.delete('/', AuthMiddleware, basketController.deleteProduct);
router.delete('/all', AuthMiddleware, basketController.emptyBasket);

module.exports = router;