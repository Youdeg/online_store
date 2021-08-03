const Router = require("express");
const router = new Router();
const authorRouter = require("./authorRouter");
const typeRouter = require("./typeRouter");
const productRouter = require("./productRouter");
const userRouter = require("./userRouter");
const basketRouter = require("./basketRouter");

router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/author', authorRouter);
router.use('/type', typeRouter);
router.use('/basket', basketRouter);

module.exports = router;