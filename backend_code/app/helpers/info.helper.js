const Data = require('../models/data')
const mongoose = require('mongoose')

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

const createInfo = async(user_id,category_id,name,username,password,url,description) => {
    
    const info = {
        name: name,
        username: username,
        password: password,
        url: url,
        description: description,
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
    return res.nModified >= 1;
}

const deleteInfo = async(user_id,category_id,info_id) => {
    const infos = await getInfos(category_id)
    infos.forEach((info)=>{
        if(info._id === info_id){
            if(info.file._id){
                const ok = File.deleteFile(info.file._id)
                if(!ok){
                    return ok
                }
            }
        }
    })
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
    
    return res.nModified >= 1;
}

const updateInfo = async(user_id,category_id,info_id,name,username,password,url,description) => {
    const info = {
        name: name,
        username: username,
        password: password,
        url: url,
        description: description,
        creation_date: Date.now()
    }
    var update ={}
    Object.entries(info).forEach(([key,value])=>{
        if(value !== undefined){
            update["category.$[i].info.$[j]."+key]=value;
        }
    })
    const res = await Data.updateOne(
        {
            _id : mongoose.Types.ObjectId(user_id)
        },
        { $set: update 
        },
        {
            arrayFilters: [
                {"i._id": mongoose.Types.ObjectId(category_id)},
                {"j._id": mongoose.Types.ObjectId(info_id) }
            ]
        }
    );

    return res.nModified >= 1;
}

const getInfoByURL = async(user_id,url) => {
    

    const res = await Data.find(
        {
        _id : mongoose.Types.ObjectId(user_id),
        'category.info.url': url
        },
        {
            'category.info.username': 1,
            'category.info.password': 1
        });

    return res;
}



module.exports = {createInfo,deleteInfo,getInfos,updateInfo,getInfoByURL}