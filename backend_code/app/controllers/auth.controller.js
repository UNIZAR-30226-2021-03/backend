const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../helpers/users.helper');
const config = require('../config');
const mail = require('../helpers/mail.helper.js');

const SingUp = async(req,res) => {
    
    try{

        // TODO: validar 
        
        const {email,nickname,password} = req.body;
        
        const userExist = await User.findUserByEmail(email);

        if(userExist !== null){
            return res.status(409).end();
        }

        const salt = await bcrypt.genSalt(14);
        const hashPassword = await bcrypt.hash(password,salt);
        
        const user = await User.createUser(email,nickname,hashPassword);
        
        const token = jwt.sign({_id: user._id},config.VERIFICATION_TOKEN,{expiresIn: 900});
        
        const err = mail.sendVerify(email,token);

        if (err){
            await User.deleteUser(user._id);
            return res.status(501).end();
        }

        return res.status(200).end();

    }catch(err){
        return res.status(500).send(err);
    }
} 

const LogIn = async(req,res) => {

    // TODO: validacion, nuevo dispositivo F2A
    try{
        const {email,password} = req.body;
    
        const userExist = await User.findUserByEmail(email);

        if(userExist){
            return res.status(404).end();
        }
        
        const validPass = await bcrypt.compare(password,userExist.password);

        if (!validPass){
            return res.status(401).end();
        }

        const token = jwt.sign({_id: userExist._id},config.ACCESS_TOKEN,{expiresIn: 3600});

        return res.status(200).send({accessToken:token});

    }catch(err){
        return res.status(500).end();
    } 
}

const Verify = async(req,res) => {
    
    const token = req.params.token;
    const verified = jwt.verify(token,config.VERIFICATION_TOKEN);
    if(verified){
        User.updateVerify(verified._id);
        return res.status(200).end();
    }
    return res.status(401).end();
    
} 
module.exports = {SingUp,LogIn,Verify}
