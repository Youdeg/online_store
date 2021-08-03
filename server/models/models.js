const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const User = sequelize.define("user", {
    id: {type: DataTypes.INTEGER,  primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Basket = sequelize.define("basket", {
    id: {type: DataTypes.INTEGER,  primaryKey: true, autoIncrement: true}
})

const BasketProduct = sequelize.define("basket_product", {
    id: {type: DataTypes.INTEGER,  primaryKey: true, autoIncrement: true}
})

const Product = sequelize.define("product", {
    id: {type: DataTypes.INTEGER,  primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false },
    price: {type: DataTypes.INTEGER, allowNull: false },
    img: {type: DataTypes.STRING, unique: true, allowNull: false },
})

const Type = sequelize.define("type", {
    id: {type: DataTypes.INTEGER,  primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false }
})

const Author = sequelize.define("author", {
    id: {type: DataTypes.INTEGER,  primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false }
})

const TypeAuthor = sequelize.define("type_author", {
    id: {type: DataTypes.INTEGER,  primaryKey: true, autoIncrement: true}
})

const Token = sequelize.define("token", {
    id: {type: DataTypes.INTEGER,  primaryKey: true, autoIncrement: true},
    refreshToken: {type: DataTypes.STRING, unique: true, allowNull: false }
})

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasOne(Token);
Token.belongsTo(User);

Basket.hasMany(BasketProduct);
BasketProduct.belongsTo(Basket);

Type.hasMany(Product);
Product.belongsTo(Type);

Author.hasMany(Product);
Product.belongsTo(Author);

Product.hasMany(BasketProduct);
BasketProduct.belongsTo(Product);

Type.belongsToMany(Author, {through: TypeAuthor });
Author.belongsToMany(Type, {through: TypeAuthor });

module.exports = {
    User, Basket, BasketProduct, Product, Author, Type, TypeAuthor, Token
}