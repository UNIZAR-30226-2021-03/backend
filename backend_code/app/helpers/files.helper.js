const multer = require('multer')

const DIR = '../upload'

const storage = multer.diskStorage({
    destination: (req,file,cb) => {

    },
    
})

//const upload = 