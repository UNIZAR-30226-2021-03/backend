const Joi = require('joi')

const signupSchema = Joi.object().keys(
    {
       email: Joi.string().email().required(),
       nickname: Joi.string().max(50).required(),
       password: Joi.string().min(1).max(24).required() //TODO: cambiar valores
    }
) 

const loginSchema = Joi.object().keys(
    {
       email: Joi.string().email().required(),
       password: Joi.string().min(1).max(24).required() //TODO: cambiar valores
    }
) 

const categorySchema = Joi.object().keys(
    {
       name: Joi.string().max(50).required()
    }
) 

const infoSchema = Joi.object().keys(
    {
        name: Joi.string().max(50).required(),
        username: Joi.string().required(),
        password: Joi.string().required(),              
        category_id: Joi.string().required(),
        url:  Joi.string().uri(),
        description:  Joi.string()
    }
) 

const infoUpdateSchema = Joi.object().keys(
    {
        name: Joi.string().max(50),
        username: Joi.string(),
        password: Joi.string(),            
        category_id: Joi.string().required(),
        info_id: Joi.string().required(),
        url:  Joi.string().uri(),
        description:  Joi.string()
    }
)

const signupValidation = (user) => { 
    const {error} =  signupSchema.validate(user);
    if (error === undefined){
        return true;
    }else{
        return false;
    }
}

const loginValidation = (user) => {
    const {error} =  loginSchema.validate(user)
    if (error === undefined){
        return true;
    }else{
        return false;
    }
}

const categoryValidation = (name) => {
    const {error} = categorySchema.validate(name)
    if (error === undefined){
        return true;
    }else{
        return false;
    }
}

const infoValidation = (info) => {
    const {error} =  infoSchema.validate(info)
    if (error === undefined){
        return true;
    }else{
        return false;
    }
}

const infoUpdateValidation = (info) => {
    const {error} =  infoUpdateSchema.validate(info)
    if (error === undefined){
        return true;
    }else{
        return false;
    }
}

module.exports = {signupValidation,loginValidation,categoryValidation,infoValidation,infoUpdateValidation}

