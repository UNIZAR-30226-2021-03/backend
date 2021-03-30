
const {infoValidation} = require('../helpers/validation.helper');
const User = require('../helpers/users.helper')
const Info = require('../helpers/info.helper')
const Category = require('../helpers/category.helper')

const crypto = require('crypto');

const GetInfos = async(req,res) => {
    try{
        const user_id = req.token._id;
        const category_id = req.query.category_id;
        const exists = await Category.checkCategory(user_id,category_id)
        if (exists){
            let infos = await Info.getInfos(category_id);
            let key = await User.getPassword(user_id);
            key = crypto.createHash('sha256').update(String(key)).digest('base64').substr(0, 32);

            for (let i = 0; i < infos.length; i++){
                let password =  infos[i].password;
                let content = password.split("-")[1];
                let iv = password.split("-")[0];                
                let decipher = crypto.createDecipheriv('aes-256-ctr',key,Buffer.from(iv, 'hex'));
                let decrypted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()]);
                infos[i].password = decrypted.toString();                
            }

            return res.status(200).send(infos);
        }else{
            
            return res.status(404).end()
        }
        
    }catch(err){
        console.log(err);
        return res.status(500).send(err);
    }
}

const CreateInfo = async(req,res) => {
    
    if(!infoValidation(req.body)){
        return res.status(400).end();
    }

    try{       
        const user_id = req.token._id; 
        const {username, password, url, description, category_id} = req.body;
        let key = await User.getPassword(user_id);

        key = crypto.createHash('sha256').update(String(key)).digest('base64').substr(0, 32);
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-ctr',key,iv);
        let encrypted = Buffer.concat([cipher.update(password), cipher.final()]);
        const str = iv.toString('hex');
        const str2 = encrypted.toString('hex');
        encrypted = str.concat("-").concat(str2);
        
        const ok = await Info.createInfo(user_id,category_id,username,encrypted,url,description)
        
        if(ok){
            return res.status(200).end()
        }else{
            return res.status(400).end()
        }
        
    }catch(err){
        console.log(err)
        return res.status(500).send(err);
    }
}

const DeleteInfo = async(req,res) => {
    try{
        const user_id = req.token._id;
        const category_id = req.query.category_id;
        const info_id = req.query.info_id
        const ok = await Info.deleteInfo(user_id,category_id,info_id);
        if(ok){
            return res.status(200).end()
        }else{
            return res.status(400).end()
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).send(err)
    }
}

module.exports = {GetInfos,CreateInfo,DeleteInfo}