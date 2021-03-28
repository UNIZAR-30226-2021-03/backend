const Joi = require('joi')

const signupShema = Joi.object().keys(
    {
       email: Joi.string().email().required(),
       nickname: Joi.string().max(50).required(),
       password: Joi.string().min(8).max(24).required() //TODO: cambiar valores
    }
) 

const loginShema = Joi.object().keys(
    {
       email: Joi.string().email().required(),
       password: Joi.string().min(8).max(24).required() //TODO: cambiar valores
    }
) 

const signupValidation = (user) => { 
    return signupShema.validate(user)
}

const loginValidation = (user) => {
    return loginShema.validate(user)
}

module.exports = {signupValidation,loginValidation}

