const Joi = require('joi');

const id = Joi.number()
const fullname = Joi.string()
const username = Joi.string()
const password = Joi.string()
const type = Joi.number()

const createUserSchema = Joi.object({
    fullname: fullname.required(),
    username: username.required(),
    password: password.required(),
    type: type.required()
});

const updateUserSchema = Joi.object({
    fullname: fullname.optional(),
    username: username.optional(),
    password: password.optional(),
    type: type.optional()
});

const getUserSchema = Joi.object({
    id: id.required()
});

module.exports = {
    createUserSchema,
    updateUserSchema,
    getUserSchema
}