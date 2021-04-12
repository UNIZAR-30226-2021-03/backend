const File = require('../helpers/file.helper')

const DownloadFile = async(req,res) => {
    const ok = File.downloadFile(req.query.file_id)
    if(!ok){
        return res.status(400).end()
    }else{
        return res.end()
    }
}

module.exports = {DownloadFile/*,DeleteFile,UploadFile*/}