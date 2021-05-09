const Data = require('../models/data')
const mongoose = require('mongoose')

const getCategories = async(id) => {
    const { category } = await Data.findById(id);

    var categories = category.map(item => { 
        return {
        _id: item._id,
        name: item.name
      }
    });
    //console.log(JSON.stringify(categories));
    //return JSON.stringify(categories);
    return categories;
}

const createCategory = async(id,name) => {
    const category = {
        name: name,
        info: []
    }
    
    const res = await Data.updateOne({_id:id},{$push : { category: category}})
    return res.nModified >= 1;
}

const deleteCategory = async(user_id,category_id) => {
    const res = await Data.updateOne({_id : user_id}, {
        $pull: {
            category: { _id: category_id }
        }
    });
    return res.nModified >= 1;
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
        return false
    }
}

const updateCategory = async(user_id,category_id,name) => {
    const res = await Data.updateOne(
        { _id:user_id, 
            category: {
            $elemMatch: {_id:category_id}
            }
        },{
            $set: {
                "category.$.name": name
            }
        }
    )
    return res.nModified >= 1;
}

module.exports = {createCategory,getCategories,deleteCategory,checkCategory,updateCategory}