const { findById } = require('../models/data')
const Data = require('../models/data')

const createCategory = async(id,name) => {
    const category = {
        name: name,
        info: []
    }
    return await Data.findByIdAndUpdate(id,{$push : { category: category}})
}

const deleteCategory = async(id) => {
    return await Data.findByIdAndDelete(id)
}

const getCategories = async(id) => {
    const {categories} = await Data.findById(id)
    return {
        name : categories.name,
        _id: categories._id
    }
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
    return await Data.findById(id)
}

module.exports = {createCategory,createInfo,deleteCategory,deleteInfo,checkCategory, getCategories,getInfos}