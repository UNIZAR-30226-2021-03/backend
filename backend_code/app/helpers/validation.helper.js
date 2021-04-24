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

const categoryCreateSchema = Joi.object().keys(
    {
        name: Joi.string().max(50).required()
    }
) 

const categoryDeleteSchema = Joi.object().keys(
    {
        category_id: Joi.string().required(),
    }
) 

const categoryUpdateSchema = Joi.object().keys(
    {
        category_id: Joi.string().required(),
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

const fileDownloadSchema = Joi.object().keys(
    {
        file_id: Joi.string().required()
    }
)

const fileUploadSchema = Joi.object().keys(
    {
        info_id: Joi.string().required(),
        category_id: Joi.string().required()
    }
)

const fileDeleteSchema = Joi.object().keys(
    {
        info_id: Joi.string().required(),
        category_id: Joi.string().required(),
        file_id: Joi.string().required()
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

const categoryCreateValidation = (name) => {
    const {error} = categoryCreateSchema.validate(name)
    if (error === undefined){
        return true;
    }else{
        return false;
    }
}

const categoryDeleteValidation = (name) => {
    const {error} = categoryDeleteSchema.validate(name)
    if (error === undefined){
        return true;
    }else{
        return false;
    }
}

const categoryUpdateValidation = (name) => {
    const {error} = categoryUpdateSchema.validate(name)
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

const fileDownloadValidation = (info) => {
    const {error} =  fileDownloadSchema.validate(info)
    if (error === undefined){
        return true;
    }else{
        return false;
    }
}

const fileUploadValidation = (info,busboy) => {
    const {error} =  fileUploadSchema.validate(info)
    if (error === undefined && busboy !== undefined){
        return true;
    }else{
        return false;
    }
}



const fileDeleteValidation = (info) => {
    const {error} =  fileDeleteSchema.validate(info)
    if (error === undefined){
        return true;
    }else{
        return false;
    }
}

module.exports = {signupValidation,loginValidation,categoryCreateValidation,categoryDeleteValidation,categoryUpdateValidation,infoValidation,infoUpdateValidation,fileDeleteValidation,fileDownloadValidation,fileUploadValidation}

