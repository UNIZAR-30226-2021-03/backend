/* Helper con funciones CRUD para los usuarios*/

const Data = require('../models/data')

const getPassword = async(id) => {
    const {password} = await Data.findById(id);
    return password
}

const findUserByEmail = async(email) => {
    const user = await Data.findOne({email:email})
    return user
}

const createUser = async(email,nickname,password) => {
    const user = new Data({
        email: email,
        nickname: nickname,
        password: password
    })
    return await user.save()
}

const deleteUser = async(id) => {
    return await Data.findByIdAndDelete(id)
}

const updateUserEmail = async(id,email) => {
    return await Data.findOneAndUpdate(id,{email:email})
    
}

const updateUserNickName = async(id,nickname) => {
    return await  Data.findByIdAndUpdate(id,{nickname:nickname})
}

const updateUser = async(id, email, nickname) => {
    return await Data.findByIdAndUpdate(id,{nickname:nickname,email:email})
} 

const updateVerify = async(id) => {
    return await Data.findByIdAndUpdate(id,{verified:true})
}

module.exports = {findUserByEmail,createUser,deleteUser,updateUserEmail,updateUserNickName,updateUser, updateVerify,getPassword}