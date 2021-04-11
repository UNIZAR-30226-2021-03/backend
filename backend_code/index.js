const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

const mongoose = require('mongoose')

const public = require('./app/routes/public')
const private = require('./app/routes/private')
const {authValidation} = require('./app/middleware/auth.middleware')
const config = require('./app/config');

mongoose.connect(config.DB_CONN,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
})

mongoose.connection.once('open', () => {
    console.log('DB CONNECTION')
})


app.set('port', config.PORT)
app.set('view engine', 'pug');
app.set("templates", path.join(__dirname,"app","templates"));

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use('/public', public)
app.use('/private',authValidation,private)

app.listen(app.get('port'), () => {
    console.log('App connected', app.get('port'))
})