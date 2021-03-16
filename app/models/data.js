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
    user: {
        name: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        }
    },
    verificated: {
        type: Boolean,
        default: false
    },
    category : [
        {
            name: String,
            info: [
                {
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
