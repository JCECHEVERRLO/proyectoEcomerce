const Joi = require('joi');

const id = Joi.number()
const name = Joi.string()
const quantity = Joi.number()
const idUser = Joi.number()

const createShoppingCarSchema = Joi.object({
    name: name.required(),
    quantity : quantity.required(),
    idUser: idUser.required(),
});

const getShoppingCarSchema = Joi.object({
    id: id.required()
});

module.exports = {
    createShoppingCarSchema,
    getShoppingCarSchema
}