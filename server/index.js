require("dotenv").config();
const express = require("express");
const sequelize = require('./db');
const models = require("./models/models");
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

const cors = require("cors");

const router = require('./routers/index');
const error = require('./middleware/ErrorMiddleware');

const PORT = process.env.PORT || 500;

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/api', router);

//обработка ошибок
app.use(error);


const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => { console.log(`server started on port ${PORT}`) })
    } catch (e) {
        console.log(e);
    }
}

start();

