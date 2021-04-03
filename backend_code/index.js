const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

const mongoose = require('mongoose')

const public = require('./app/routes/public')
const private = require('./app/routes/private')
const {authValidation} = require('./app/middleware/auth.middleware')
const config = require('./app/config');


//const p = require('./app/helpers/info.helper')
//
//p.updateInfo('6062450ccb63284dfa78089a','6062450ccb63284dfa78089b','606332871df6611e154b3619','p1','1234','facebook@gmail.com','holamundo')
mongoose.connect(config.DB_CONN,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
})

mongoose.connection.once('open', () => {
    console.log('DB CONNECTION')
})


//const Data = require('./app/models/data')
//newdata = new Data( {
//    email : 'arturo3@gmail.com',
//    password: '$2a$14$HpXQt6RxZJ9AB0Ot7lq24OYAKoSM0MtgCWerv9dfVIQyl4X2wo4pm',
//    nickname: 'Arturo',
//    verified: true,
//    category: [
//        {
//            name: 'trabajo',
//            info: [
//                {
//                    username: 'barbaros',
//                    password: 'SaBeBoVeBeCa123456',
//                    url : 'mongodb.com',
//                },
//                {
//                    username: 'f',
//                    password: 'dsfasdf',
//                    url : 'mongodb-atlas.com',
//                }
//            ]
//        },
//        {
//            name: 'casa',
//            info: [
//                {
//                    username: 'barbaros',
//                    password: 'SaBeBoVeBeCa123456',
//                    url : 'mongodb.com',
//                },
//                {
//                    username: 'f',
//                    password: 'dsfasdf',
//                    url : 'mongodb-atlas.com',
//                }
//            ]
//        },
//        {
//            name: 'uni',
//            info: [
//                {
//                    username: 'barbaros',
//                    password: 'SaBeBoVeBeCa123456',
//                    url : 'mongodb.com',
//                },
//                {
//                    username: 'f',
//                    password: 'dsfasdf',
//                    url : 'mongodb-atlas.com',
//                }
//            ]
//        }
//    ]
//})
//
//const saved = newdata.save()



app.set('port', config.PORT)

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use('/public', public)
app.use('/private',authValidation,private)

app.listen(app.get('port'), () => {
    console.log('App connected', app.get('port'))
})