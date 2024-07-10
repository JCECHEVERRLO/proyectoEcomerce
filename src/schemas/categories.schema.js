const Joi = require('joi');

const id = Joi.number()
const name = Joi.string()

const createCategorySchema = Joi.object({
    name: name.required(),
});

const updateCategorySchema = Joi.object({
    name: name.optional(),
});

const getCategorySchema = Joi.object({
    id: id.required()
});

module.exports = {
    createCategorySchema,
    updateCategorySchema,
    getCategorySchema
}