const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../helpers/users.helper');
const config = require('../config');
const mail = require('../helpers/mail.helper.js');
const {signupValidation,loginValidation} = require('../helpers/validation.helper')

const SingUp = async(req,res) => {
    
    if(!signupValidation(req.body)){
        return res.status(400).send({});
    }

    try{
        
        const {email,nickname,password} = req.body;
        let user;
        
        const userExist = await User.findUserByEmail(email);

        if(userExist !== null && userExist.verified === true){
            return res.status(409).send({});
        }
        else if (userExist === null){
            const salt = await bcrypt.genSalt(14);
            const hashPassword = await bcrypt.hash(password,salt);
            
            user = await User.createUser(email,nickname,hashPassword);
        }else{
            user=userExist
        }
        //Puede haber fallado la verifificación anterior y existir el user
        
        const token = jwt.sign({_id: user._id},config.VERIFICATION_TOKEN,{expiresIn: 900});
        
        const err = mail.sendVerify(email,token);

        if (err){
            await User.deleteUser(user._id);
            return res.status(480).send({});
        }

        return res.status(200).send({});

    }catch(err){
        return res.status(500).send(err);
    }
} 

const LogIn = async(req,res) => {

    // TODO: nuevo dispositivo

    if(!loginValidation(req.body)){
        return res.status(400).send({});
    }

    try{
        const {email,password} = req.body;
    
        const userExist = await User.findUserByEmail(email);

        if(userExist === null || userExist.verified === false){
            
            return res.status(404).send({});
        }
        
        const validPass = await bcrypt.compare(password,userExist.password);

        if (!validPass){
            return res.status(401).send({});
        }

        const code = (100000 + Math.floor(Math.random() * 900000)).toString();
        const token = jwt.sign({_2faToken: code, _id: userExist._id },config._2FA_TOKEN,{expiresIn: 300});

        const err = mail.send2FA(email,code);
        
        if (err){
            return res.status(480).send({});
        }

        return res.status(200).send({_2faToken:token});

    }catch(err){
        return res.status(500).send({});
    } 
}

const Verify = async(req,res) => {
    
    const token = req.params.token;
    try{
        const verified = jwt.verify(token,config.VERIFICATION_TOKEN);
        if(verified){
            User.updateVerify(verified._id);
            return res.status(200).render('index');
        }
        return res.status(401).render('index_error');
    }catch(err){
        return res.status(401).render('index_error');
    }
} 

const _2FA_Auth = async(req,res) => {
    try{
        const token = req.body._2faToken;
        if(!token){
            res.status(400).send({});
        }

        const secret = jwt.verify(token,config._2FA_TOKEN);
        if (secret){
            if(secret._2faToken == req.body.code){
                const accessToken = jwt.sign({_id: secret._id},config.ACCESS_TOKEN,{expiresIn: 3600});
                return res.status(200).send({accessToken:accessToken});
            }else{
                return res.status(401).send({});
            }
        }else{
            return res.status(401).send({});
        }
    }catch(err){
        console.log(err)
        return res.status(401).send(err);
    }
}
module.exports = {SingUp,LogIn,Verify,_2FA_Auth}
