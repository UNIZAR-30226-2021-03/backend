const express = require('express')
const morgan = require('morgan')
const app = express()

const mongoose = require('mongoose')

const public = require('./app/routes/public')
const Data = require('./app/models/data')

mongoose.connect(process.env.DB_CONN || 'mongodb+srv://KeyPaXAdmin:SaBeBoVeBeCa123456@cluster0.yyh5k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
    console.log('DB CONNECTION')
})

//newdata = new Data( {
//    email : 'arturo@gmail.com',
//    password: '12345',
//    user: {
//        name: 'Arturo',
//        surname: 'Calvera'
//    },
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


app.set('port', process.env.PORT || 8080)

app.use(morgan('dev'))
app.use('/public', public)

app.listen(app.get('port'), () => {
    console.log('App connected', app.get('port'))
})