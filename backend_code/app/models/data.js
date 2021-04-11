const {model, Schema, ObjectId} = require('mongoose') 

const Data = new Schema({
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    }, 
    verified: {
        type: Boolean,
        default: false
    },
    category : [
        {
            name: {
                type: String,
                required: true
            },
            info: [
                {   
                    name: {
                        type: String,
                        required: true
                    },
                    username:{
                        type: String,
                        required: true
                    },
                    password: {
                        type: String,
                        required: true
                    },
                    url : String,
                    description: String,
                    creation_date : {
                        type: Date,
                        default: Date.now()
                    },
                    file: {
                        type: ObjectId
                    }
                }
            ]
        }
    ]
})

module.exports = model('Data', Data)
