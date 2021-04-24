const {categoryCreateValidation,categoryDeleteValidation,categoryUpdateValidation} = require('../helpers/validation.helper');
const Category = require('../helpers/category.helper')

const GetCategories = async(req,res) => {
    try{
        const user_id = req.token._id;
        const categories = await Category.getCategories(user_id);
        return res.status(200).send(categories);
    }catch(err){
        return res.status(500).send(err);
    }
}

const CreateCategory = async(req,res) => {

    if(!categoryCreateValidation(req.body)){
        return res.status(400).send({});
    }

    try{
        const user_id = req.token._id;
        
        const ok = await Category.createCategory(user_id,req.body.name)

        if(ok){
            return res.status(200).send({})
        }else{
            return res.status(400).send({})
        }
        
    }catch(err){
        return res.status(500).send(err);
    }
}

const DeleteCategory = async(req,res) => {

    if(!categoryDeleteValidation(req.query)){
        return res.status(400).send({});
    }

    try{
        const user_id = req.token._id;
        const category_id = req.query.category_id;
        const ok = await Category.deleteCategory(user_id,category_id);
        if(ok){
            return res.status(200).send({})
        }else{
            return res.status(400).send({})
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).send(err)
    }
}


const UpdateCategory = async(req,res) => {
    
    if(!categoryUpdateValidation(req.body)){
        return res.status(400).end({});
    }
    try{
        const user_id = req.token._id;
        const category_id = req.body.category_id;
        const name = req.body.name;
        const ok = await Category.updateCategory(user_id,category_id,name);
        if(ok){
            return res.status(200).send({})
        }else{
            return res.status(400).send({})
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).send(err)
    }
}



module.exports = {CreateCategory,DeleteCategory,GetCategories,UpdateCategory}