
const {categoryValidation,infoValidation} = require('../helpers/validation.helper');
const Data = require('../helpers/data.helper');
const User = require('../helpers/users.helper')
const crypto = require('crypto');

const GetCategories = async(req,res) => {
    try{
        const user_id = req.token._id;
        const categories = await Data.getCategories(user_id);
        return res.status(200).send(categories);
    }catch(err){
        return res.status(500).send(err);
    }
}

const GetInfos = async(req,res) => {
    try{
        const user_id = req.token._id;
        const category_id = req.query.category_id;
        const exists = await Data.checkCategory(user_id,category_id)
        if (exists){
            let infos = await Data.getInfos(category_id);
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

const CreateCategory = async(req,res) => {

    if(!categoryValidation(req.body)){
        return res.status(400).end();
    }

    try{
        const user_id = req.token._id;
        
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
        
        await Data.createInfo(user_id,category_id,username,encrypted,url,description)
        
        return res.status(200).end()
        
    }catch(err){
        console.log(err)
        return res.status(500).send(err);
    }
}


const DeleteCategory = async(req,res) => {
    try{
        const user_id = req.token._id;
        const category_id = req.query.category_id;
        await Data.deleteCategory(user_id,category_id);
        return res.status(200).end()
    }
    catch(err){
        console.log(err);
        return res.status(500).send(err)
    }
}

const DeleteInfo = async(req,res) => {
    try{
        const user_id = req.token._id;
        const category_id = req.query.category_id;
        const info_id = req.query.info_id
        await Data.deleteInfo(user_id,category_id,info_id);
        return res.status(200).end()
    }
    catch(err){
        console.log(err);
        return res.status(500).send(err)
    }
}

//TODO: Delete categorias e infos


module.exports = {GetCategories,GetInfos,CreateCategory,CreateInfo,DeleteCategory,DeleteInfo}