const Data = require('../models/data')
const mongoose = require('mongoose')

const createInfo = async(user_id,category_id,username,password,url,description) => {
    const info = {
        username: username,
        password: password,
        url: url,
        description: description
    }
    const res = await Data.updateOne(
        {
            _id: mongoose.Types.ObjectId(user_id), category: { 
                $elemMatch: {
                     _id: mongoose.Types.ObjectId(category_id)
                }
            }
        },
        { $push: { "category.$.info": info} })
    return res.n === 1;
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
    return res.category[0].info;
}

const deleteInfo = async(user_id,category_id,info_id) => {
    const res = await Data.updateOne(
        {
            _id : mongoose.Types.ObjectId(user_id), category: { 
                $elemMatch: {
                     _id: mongoose.Types.ObjectId(category_id)
                }
            }
        },
        { $pull: { "category.$.info": { _id: mongoose.Types.ObjectId(info_id) }}
    });

    return res.n === 1;
}

module.exports = {createInfo,deleteInfo,getInfos}