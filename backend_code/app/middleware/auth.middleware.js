const jwt = require('jsonwebtoken')
const config = require('../config')

const authValidation = (req,res,next) => {
    console.log(req);
    try{
        const token = req.header('accessToken')
        console.log(req.header('accessToken'));
        if(!token){
            return res.status(403).send({})
        }

        const verified = jwt.verify(token,config.ACCESS_TOKEN)
        if (verified){
            req.token = verified
            next()
        }else{
            return res.status(401).send({})
        }
    }catch(err){
        return res.status(401).send(err)
    }
}

module.exports = {authValidation}