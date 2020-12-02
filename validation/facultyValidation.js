const Joi = require('joi')

const student = Joi.object({
    firstname: Joi.string().regex(/^[A-Z]+$/).required(),
    lastname: Joi.string().regex(/^[A-Z]+$/).required(),
    age: Joi.number().integer().greater(0).required(),
    gender: Joi.string().required(),
    address: Joi.string().required(),
    email: Joi.string().email().required(),
    contactnumber: Joi.string().regex(/^\d{3}-\d{4}-\d{3}$/).required(),
    course: Joi.string().required(),
    yearlevel: Joi.string().required()
})

module.exports = student