const defineProduct = require("./products.model");
const defineUser = require("./users.model");
const defineCategory = require("./categories.model");
const defineShoppingCar = require("./ShoppingCar.model");

function defineModels( sequelize ){
    defineProduct(sequelize)
    defineUser(sequelize)
    defineCategory(sequelize)
    defineShoppingCar(sequelize)
    //Other models go here
}


module.exports = defineModels