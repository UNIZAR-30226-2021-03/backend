const Data = require('../models/data')
const mongoose = require('mongoose')

const createCategory = async(id,name) => {
    const category = {
        name: name,
        info: []
    }
    
    const cat = await Data.findByIdAndUpdate(id,{$push : { category: category}},{new: true})

    var categories = cat.category.map(item => { 
        return {
        _id: item._id,
        name: item.name
      }
    });

    return categories
}

const getCategories = async(id) => {
    const { category } = await Data.findById(id);

    var categories = category.map(item => { 
        return {
        _id: item._id,
        name: item.name
      }
    });
    return categories;
}

const deleteCategory = async(user_id,category_id) => {
    await Data.updateOne({_id : user_id}, {
        $pull: {
            category: { _id: category_id }
        }
    });
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

const createInfo = async(user_id,category_id,username,password,url,description) => {
    const info = {
        username: username,
        password: password,
        url: url,
        description: description
    }
    await Data.updateOne(
        {
            _id: mongoose.Types.ObjectId(user_id), category: { 
                $elemMatch: {
                     _id: mongoose.Types.ObjectId(category_id)
                }
            }
        },
        { $push: { "category.$.info": info} })
    
}

const deleteInfo = async(user_id,category_id,info_id) => {
    await Data.updateOne({_id : user_id,
        category: { 
            $elemMatch: {
                 _id: mongoose.Types.ObjectId(category_id)
            }
    }}, {
        $pull: {
            info: { _id: info_id }
        }
    });
}

const getInfos = async(id) => {

    const res = await Data.findOne({'category._id': id}, {
        category: {
            $filter: {
                input:'$category',
                as: 'category',  
                cond: { $eq: ['$$category._id', mongoose.Types.ObjectId(id)]}
            }
        },
        _id: 0
    })
    return res.category[0].info
}

module.exports = {createCategory,createInfo,deleteCategory,deleteInfo,checkCategory, getCategories,getInfos}