
const {categoryValidation,infoValidation} = require('../helpers/validation.helper');
const Data = require('../helpers/data.helper');
const User = require('../helpers/users.helper')
const crypto = require('crypto');

const GetCategories = async(req,res) => {
    try{
        const user_id = req.body.token._id;
        const categories = await Data.getCategories(user_id);
        return res.status(200).send(categories);
    }catch(err){
        return res.status(500).send(err);
    }
}

const GetInfos = async(req,res) => {
    try{
        const user_id = req.body.token._id;
        const category_id = req.query.category_id;
        const exists = await Data.checkCategory(user_id,category_id)
        
        if (exists){
            const infos = await Data.getInfos(category_id);

            const key = User.getPassword(user_id);
            
            for (let i = 0; i < infos.length; i++){
                let password =  infos[i].password;

                let content = password.split("-")[0];
                let iv = password.split("-")[1];
                
                let decipher = crypto.createDecipherv('aes-256-ctr',key,Buffer.from(iv, 'hex'));
                let decrypted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()]);

                infos[i].password = decrypted.toString();                
            }

            return res.status(200).send(infos);
        }else{
            return res.status(404).end()
        }
        
    }catch(err){
        return res.status(500).send(err);
    }
}

const CreateCategory = async(req,res) => {

    if(!categoryValidation(req.body)){
        return res.status(400).end();
    }

    try{
        const user_id = req.body.token._id;
        
        const category = await Data.createCategory(user_id,req.body.name)

        return res.status(200).send(category)
        
    }catch(err){
        return res.status(500).send(err);
    }
}



const CreateInfo = async(req,res) => {
    
    if(!infoValidation(req.body)){
        return res.status(400).end();
    }

    try{       
        const user_id = req.body.token._id; 
        const {username, password, url, description, category_id} = req.body;
        const key = User.getPassword(user_id);

        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipherv('aes-256-ctr',key,iv);

        const encrypted = Buffer.concat([cipher.update(password), cipher.final()]);

        const str = iv.toString('hex');
        const str2 = encrypted.toString('hex');
        encrypted = str.concat("-").concat(str2);
        
        const info = await Data.createInfo(category_id,username,encrypted,url,description)
        return res.status(200).send(info)
        
    }catch(err){
        return res.status(500).send(err);
    }
}


module.exports = {GetCategories,GetInfos,CreateCategory,CreateInfo}