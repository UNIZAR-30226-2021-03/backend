const jwt = require('jsonwebtoken')
const config = require('../config')

const authValidation = (req,res,next) => {
    const token = req.header('accessToken')
    if(!token){
        res.status(403).end()
    }

    const verified = jwt.verify(token,config.ACCESS_TOKEN)
    if (verified){
        req.token = verified
        next()
    }else{
        res.status(401).end()
    }
}

module.exports = {authValidation}