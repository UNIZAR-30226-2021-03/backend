const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

const mongoose = require('mongoose')

const public = require('./app/routes/public')
const Data = require('./app/models/data')
const config = require('./app/config');

mongoose.connect(config.DB_CONN,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
    console.log('DB CONNECTION')
})

app.set('port', config.PORT || 8080)

app.use(cors())
app.use(morgan('dev'))
app.use('/public', public)

app.listen(app.get('port'), () => {
    console.log('App connected', app.get('port'))
})