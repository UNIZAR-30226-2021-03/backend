const mongoose = require ('mongoose');

const uploadFile = async (busboy) => {
	const gridFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {bucketName: 'uploads'});
  	req.pipe(busboy).
    on('file', (fieldname, file, filename) => {
		file.pipe(gridFSBucket.openUploadStream(filename)).
		on('error', (error) => {
		  	return {ok: false}
	  	}).
	  	on('finish', (data) => {
			return {ok: true, name: filename, file_id: data._id}
	  	});
    }); 
}

const deleteFile = async(id) => {
	const gridFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {bucketName: 'uploads'});
	try{
		const error = await gridFSBucket.delete( mongoose.Types.ObjectId(id))
		if(error){
			return false
		}else{
			return true
		}
	}catch(err){
		return false
	}

}


const downloadFile = async (id) => {
	const gridFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {bucketName: 'uploads'});
    try{
        const file = await gridFSBucket.find({_id: mongoose.Types.ObjectId(id) }).toArray()
		if (!file.length) {
            return false
		}
        res.set('Content-Disposition', 'attachment; filename="' + file[0].filename + '"');

        gridFSBucket.openDownloadStream(mongoose.Types.ObjectId(id)).
        pipe(res).
        on('error', (error) => {
          	return false
        }).
        on('finish', () =>{
            return true
        });
      }catch(err){
        return false
    }
}

module.exports = {uploadFile,deleteFile,downloadFile}