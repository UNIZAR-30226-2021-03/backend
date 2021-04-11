const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path');
const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');
const multer = require('multer');
const crypto = require('crypto');
const app = express()

const mongoose = require('mongoose')

const public = require('./app/routes/public')
const private = require('./app/routes/private')
const {authValidation} = require('./app/middleware/auth.middleware')
const config = require('./app/config');


let gfs;

const conn = mongoose.createConnection(config.DB_CONN,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
})

conn.once('open', () => {
    console.log("DB CONNECTED")
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
    
})

const storage = new GridFsStorage({
    url: config.DB_CONN,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + file.originalname;
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    },
    options: {useUnifiedTopology: true}
  });
 
 
const upload = multer({ storage }); 


app.set('port', config.PORT)
app.set('view engine', 'pug');
app.set('views', path.join(__dirname,'app','templates'));

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use('/public', public)
app.use('/private',authValidation,private)


app.post('/upload', upload.single('file'), (req, res) => {
    gfs.files.find().toArray((err, files) => {
        if (!files || files.length === 0) {
          res.status(400).json({"err": "no files"})
          
        } else {
          files.map(file => {
            if (
              file.contentType === 'image/jpeg' ||
              file.contentType === 'image/png'
            ) {
              file.isImage = true;
            } else {
              file.isImage = false;
            }
          });
          res.status(200).end()
        }
    });
});

app.get('/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: 'No files exist'
        });
      }
      return res.json(files);
    });
});

app.get('/files/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);;
    });
});

app.get('/image/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
      if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } else {
        res.status(404).json({
          err: 'Not an image'
        });
      }
    });
});


app.listen(app.get('port'), () => {
    console.log('App connected', app.get('port'))
})