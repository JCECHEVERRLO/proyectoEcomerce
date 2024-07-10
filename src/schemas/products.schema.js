const Joi = require('joi');

const id = Joi.number()
const name = Joi.string()
const price = Joi.number()
const brand = Joi.string()
const description = Joi.string()
const stock = Joi.number().min(0)
const id_category = Joi.number()

const createProductSchema = Joi.object({
    name: name.required(),
    price: price.required(),
    brand: brand.required(),
    description: description.required(),
    stock: stock.required(),
    id_category: id_category.required()
});

const updateProductSchema = Joi.object({
    name: name.optional(),
    price: price.optional(),
    brand: brand.optional(),
    description: description.optional(),
    stock: stock.optional(),
    id_category: id_category.required()
});

const getProductSchema = Joi.object({
    id: id.required()
});

module.exports = {
    createProductSchema,
    updateProductSchema,
    getProductSchema
}