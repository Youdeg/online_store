const Router = require("express");
const router = new Router();

const {body} = require('express-validator');

const authMiddleware = require('../middleware/AuthMiddleware');
const userController = require("../controllers/userController");

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 32 })
    , userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/auth', userController.check);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getAll);

module.exports = router;