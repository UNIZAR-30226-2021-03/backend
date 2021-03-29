const { findById } = require('../models/data')
const Data = require('../models/data')

const createCategory = async(id,name) => {
    const category = {
        name: name,
        info: []
    }
    //New:true para que devuelva el documento actualizado
    const cat = await Data.findByIdAndUpdate(id,{$push : { category: category}},{new: true})

    var categories = cat.category.map(item => { 
        return {
        _id: item._id,
        name: item.name
      }
    });

    return categories
}

const deleteCategory = async(id) => {
    return await Data.findByIdAndDelete(id)
}

const getCategories = async(id) => {
    const {category} = await Data.findById(id);

    var categories = category.map(item => { 
        return {
        _id: item._id,
        name: item.name
      }
    });
    return categories;
}

const checkCategory = async(user_id,category_id) => {
    const res = await Data.findOne(
        {
            $and: [
            {
                category: {
                $elemMatch: {_id:category_id}
                }
            },
            {
                _id: user_id
            }
            ]
        }
    )
    if(res){
        return true
    }else{
        false
    }
}

const createInfo = async(id,username,password,url,description) => {
    const info = {
        username: username,
        password: password,
        url: url,
        description: description
    }
    return await Data.findOneAndUpdate(id,{ $push: {info: info} })
}

const deleteInfo = async(id) => {
    return await Data.findByIdAndDelete(id)
}

const getInfos = async(id) => {
    return await Data.findById(id);
}

module.exports = {createCategory,createInfo,deleteCategory,deleteInfo,checkCategory, getCategories,getInfos}