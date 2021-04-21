const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path');
//const Grid = require('gridfs-stream');
//const GridFsStorage = require('multer-gridfs-storage');
//const multer = require('multer');
//const crypto = require('crypto');
const app = express()

const mongoose = require('mongoose')

const public = require('./app/routes/public')
const private = require('./app/routes/private')
const {authValidation} = require('./app/middleware/auth.middleware')
const config = require('./app/config');


//let gfs;

/*
const conn = mongoose.createConnection(config.DB_CONN,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
})

conn.once('open', () => {
    console.log("DB CONNECTED")
    //gfs = Grid(conn.db, mongoose.mongo);
    //gfs.collection('uploads');
    
})*/

mongoose.connect(config.DB_CONN,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
})
  
mongoose.connection.once('open', () => {
    console.log("DB CONNECTED")
})
  
/*
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

//TODO: change cause decapred, poner en modulo aparte
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
*/

app.set('port', config.PORT)
app.set('view engine', 'pug');
app.set('views', path.join(__dirname,'app','templates'));

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use('/public', public)
app.use('/private',authValidation,private)

app.listen(app.get('port'), () => {
    console.log('App connected', app.get('port'))
})

/*
const User = require('./app/helpers/users.helper')
const Info = require('./app/helpers/info.helper')
const crypto = require('crypto');

const prueba = async() => {


try{       
  const user_id = "607e8f8231f168729b4240bb";
  const name="prueba"
  const username="prueba"
  const password="prueba"
  const url="https://prueba.com"
  const description="prueba"
  const category_id="608009eb93b3c4075c1b4f5d"

  let key = await User.getPassword(user_id);

  key = crypto.createHash('sha256').update(String(key)).digest('base64').substr(0, 32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-ctr',key,iv);
  let encrypted = Buffer.concat([cipher.update(password), cipher.final()]);
  const str = iv.toString('hex');
  const str2 = encrypted.toString('hex');
  encrypted = str.concat("-").concat(str2);
  
  const ok = await Info.createInfo(user_id,category_id,name,username,encrypted,url,description)
  
  if(ok){
      console.log(ok);
  }else{
  }
  
}catch(err){
  console.log(err)
}
}

const update = async() =>{
  try{     
    console.log("func");
    const user_id = "607e8f8231f168729b4240bb";
    const name=undefined
    const username="guardiola"
    const password="undefined"
    const url="nueva"
    const description="nueva"
    const category_id="608009eb93b3c4075c1b4f5d"
    const info_id= "608014c9e3958a3e242faf8d"
    
    let encrypted=undefined
    if(password !== undefined){
        let key = await User.getPassword(user_id);

        key = crypto.createHash('sha256').update(String(key)).digest('base64').substr(0, 32);
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-ctr',key,iv);
        encrypted = Buffer.concat([cipher.update(password), cipher.final()]);
        const str = iv.toString('hex');
        const str2 = encrypted.toString('hex');
        encrypted = str.concat("-").concat(str2);
    }
    
    console.log("await");
    const ok = await Info.updateInfo(user_id,category_id,info_id,name,username,encrypted,url,description)
    
    if(ok){
        console.log("updated");
    }else{
      console.log("not updated");
    }
    
}catch(err){
}
}

const gen = async() =>{
  //await prueba()
  await update()
}
*/
