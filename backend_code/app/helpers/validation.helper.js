const Joi = require('joi')

const signupSchema = Joi.object().keys(
    {
       email: Joi.string().email().required(),
       nickname: Joi.string().max(50).required(),
       password: Joi.string().min(8).max(24).required() //TODO: cambiar valores
    }
) 

const loginSchema = Joi.object().keys(
    {
       email: Joi.string().email().required(),
       password: Joi.string().min(8).max(24).required() //TODO: cambiar valores
    }
) 

const categorySchema = Joi.object().keys(
    {
       name: Joi.string().max(50).required()
    }
) 

const infoSchema = Joi.object().keys(
    {
        username: Joi.string().required(),
        password: Joi.string().required(),              //TODO: cambiar valores
        url:  Joi.string().uri(),
        description:  Joi.string()
    }
) 

const signupValidation = (user) => { 
    return signupSchema.validate(user)
}

const loginValidation = (user) => {
    return loginSchema.validate(user)
}

const categoryValidation = (name) => {
    return categorySchema.validate(name)
}

const infoValidation = (info) => {
    return infoSchema.validate(info)
}

module.exports = {signupValidation,loginValidation,categoryValidation,infoValidation}

