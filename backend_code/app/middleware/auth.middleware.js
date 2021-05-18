const jwt = require('jsonwebtoken')
const config = require('../config')

const authValidation = (req,res,next) => {
    console.log("ANTES DE LA FUNCIÓN",req.header('accessToken'))
    try{
        const token = req.header('accessToken')
        if(!token){
            return res.status(403).send({})
        }

        const verified = jwt.verify(token,config.ACCESS_TOKEN)
        if (verified){
            req.token = verified
            console.log("CORRECTO",req.header('accessToken'))
            next()
        }else{
            console.log("POR EL ELSE DE VERIFY",req.header('accessToken'))
            return res.status(401).send({})
        }
    }catch(err){
        console.log("POR EL CATCH",req.header('accessToken'))
        console.log(err);
        return res.status(401).send(err)
    }
}

module.exports = {authValidation}