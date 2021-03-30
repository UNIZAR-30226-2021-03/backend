const Data = require('../models/data')
const mongoose = require('mongoose')

const createCategory = async(id,name) => {
    const category = {
        name: name,
        info: []
    }
    
    const cat = await Data.findByIdAndUpdate(id,{$push : { category: category}},{new: true})

    return res.n === 1;
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
    const res = await Data.updateOne({_id : user_id}, {
        $pull: {
            category: { _id: category_id }
        }
    });
    return res.n === 1;
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

module.exports = {createCategory,getCategories,deleteCategory,checkCategory}