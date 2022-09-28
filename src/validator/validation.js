const Joi = require('@hapi/joi');

const bookValidation = Joi.object({
    bookname: Joi.string().required(),
    bookdescription: Joi.string().required(),
    author: Joi.string().required(),
    price: Joi.number().required(),
    currency: Joi.string().required(),
    rating: Joi.number().required(),
})

const userValidation = Joi.object({
    firstname: Joi.string().min(4).max(10).required(),
    lastname: Joi.string().min(4).max(10).required(),
    phone: Joi.number().required(),
    address: Joi.string().required(),
    email: Joi.string().lowercase().required(),
    password: Joi.string().required(),
})

module.exports ={
    bookValidation,
    userValidation
};