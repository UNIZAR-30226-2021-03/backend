const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path');
const app = express()

const mongoose = require('mongoose')
const busboy = require('connect-busboy')

const public = require('./app/routes/public')
const private = require('./app/routes/private')
const {authValidation} = require('./app/middleware/auth.middleware')
const config = require('./app/config');
const Data = require('./app/models/data')

mongoose.connect(config.DB_CONN,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
})
    
mongoose.connection.once('open', () => {
  	console.log("DB CONNECTED")
  	
})

app.set('port', config.PORT)
app.set('view engine', 'pug');
app.set('views', path.join(__dirname,'app','templates'));

app.use(cors())
app.use(morgan('dev'))
app.use(busboy())
app.use(express.json())
app.use('/public', public)
app.use('/private',authValidation,private)


// Data.updateOne(
//	{
//		_id : mongoose.Types.ObjectId('6062450ccb63284dfa78089a'), category: { 
//			$elemMatch: {
//				 _id: mongoose.Types.ObjectId('6062450ccb63284dfa78089b')
//			}
//		}
//	},
//	{ $pull: { "category.$.info": { _id: mongoose.Types.ObjectId('60633416fce6f11fdc313221') }}
//},{new:true}).then( res => {
//	console.log(res)
//})



app.post('/upload', (req, res) => {
	gridFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {bucketName: 'uploads'});
  	req.pipe(req.busboy);
  	
 	req.busboy.on('file', (fieldname, file, filename) => {
		file.pipe(gridFSBucket.openUploadStream(filename)).
		on('error', (error) => {
		  	res.send(error).end()
	  	}).
	  	on('finish', (id) => {
      console.log(id);
			console.log('done!');
			res.end()
	  	});
    });
  
});

app.delete('/files/:id',async(req,res) => {
	gridFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {bucketName: 'uploads'});
	try{
		const error = await gridFSBucket.delete( mongoose.Types.ObjectId(req.params.id))
		if(error){
			return res.status(404).end()
		}else{
			res.end()
		}
	}catch(err){
		return res.status(500).send(err)
	}

})


app.get('/files/:id', async (req, res) => {
	gridFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {bucketName: 'uploads'});
    try{
        const file = await gridFSBucket.find({_id: mongoose.Types.ObjectId(req.params.id) }).toArray()
		if (!file.length) {
            return res.status(404).send('Error on the database looking for the file.');
		}
        res.set('Content-Disposition', 'attachment; filename="' + file[0].filename + '"');

        gridFSBucket.openDownloadStream(mongoose.Types.ObjectId(req.params.id)).
        pipe(res).
        on('error', (error) => {
          	res.send(error).end()
        }).
        on('finish', () =>{
          	console.log('done!');
        });
      }catch(err){
      	return res.status(500).send(err);
    }
});

app.listen(app.get('port'), () => {
    console.log('App connected', app.get('port'))
})